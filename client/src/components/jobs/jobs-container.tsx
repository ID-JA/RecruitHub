import { Box, Group, Select, Stack } from '@mantine/core';
import JobCard from './job-card';
import { Suspense, useState } from 'react';
import JobCardPlaceholder from './job-card-placeholder';
import NoJobsPlaceholder from './no-job-palceholder';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { useAuthStore } from '../../store';

const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'Google',
    location: 'Remote',
    status: 'Open',
    applicants: 0,
    created: '2021-05-01'
  }
];

export interface JobData {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: string; // Assuming salary is stored as a string in the JSON data
  form: string;
  status: number;
  created_at: string; // Assuming the date is stored as a string in the JSON data
  updated_at: string; // Assuming the date is stored as a string in the JSON data
  company_id: number;
  user_id: number;
}

function JobsContainer() {
  const { selectedCompany, companies, setSelectedCompany } = useAuthStore();
  const [filterOptions, setFilterOptions] = useState<{
    company: string | null;
    status: string | null;
    order: 'desc' | 'asc';
  }>({
    company: selectedCompany?.value || null,
    status: null,
    order: 'desc'
  });
  const { data, isLoading } = useQuery<JobData[]>({
    queryKey: ['my-jobs', filterOptions],
    queryFn: async () => {
      const response = await axiosInstance.get('/jobs', {
        params: filterOptions
      });
      return response.data;
    },
    staleTime: Infinity
  });

  const handleChangeCompany = (value: string | null) => {
    setFilterOptions({
      ...filterOptions,
      company: value
    });
  };

  const handleStatusChange = (value: string | null) => {
    setFilterOptions({
      ...filterOptions,
      status: value
    });
  };

  return (
    <>
      <Group mt='xl'>
        <Select
          placeholder='company'
          title='filter by company'
          data={companies}
          value={filterOptions.company}
          onChange={handleChangeCompany}
          clearable
        />
        <Select
          placeholder='status'
          title='filter by status'
          value={filterOptions.status}
          onChange={handleStatusChange}
          clearable
          data={['Active', 'Closed', 'Pending', 'Achieve']}
        />
      </Group>
      {/* Search */}
      <Stack component='ul' gap='md' p='0px' mt='xl'>
        {!isLoading && data ? (
          data.length > 0 ? (
            data.map((props) => (
              <Suspense key={props.id} fallback={<JobCardPlaceholder />}>
                <JobCard props={props} />
              </Suspense>
            ))
          ) : (
            <NoJobsPlaceholder />
          )
        ) : (
          Array.from({ length: 10 }).map((_, i) => <JobCardPlaceholder key={i} />)
        )}
      </Stack>
    </>
  );
}

export default JobsContainer;
