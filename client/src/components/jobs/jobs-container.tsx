import { Group, Pagination, Select, Stack } from '@mantine/core';
import JobCard from './job-card';
import { Suspense, useEffect, useState } from 'react';
import JobCardPlaceholder from './job-card-placeholder';
import NoJobsPlaceholder from './no-job-palceholder';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { useAuthStore } from '../../store';

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

export interface JobDataWithPagination {
  data: JobData[];
  current_page: number;
  last_page: number;
  total: number;
  from: number;
  to: number;
}

function JobsContainer() {
  const { selectedCompany, companies } = useAuthStore();
  const queryClient = useQueryClient();
  const [filterOptions, setFilterOptions] = useState<{
    company: string | null;
    status: string | null;
    order: 'desc' | 'asc';
    page: number;
  }>({
    company: selectedCompany?.value || null,
    status: null,
    order: 'desc',
    page: 1
  });
  const { data, isFetching, isPlaceholderData } = useQuery<JobDataWithPagination>({
    queryKey: ['my-jobs', filterOptions],
    queryFn: () => fetchJobs(filterOptions),
    placeholderData: keepPreviousData,
    staleTime: 5000
  });

  // Prefetch the next page!
  useEffect(() => {
    const hasMore = data?.to != data?.total;
    if (!isPlaceholderData && hasMore) {
      queryClient.prefetchQuery({
        queryKey: [
          'my-jobs',
          {
            ...filterOptions,
            page: filterOptions.page + 1
          }
        ],
        queryFn: () =>
          fetchJobs({
            ...filterOptions,
            page: filterOptions.page + 1
          })
      });
    }
  }, [data, isPlaceholderData, filterOptions, queryClient]);

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

  const handlePageChange = (value: number) => {
    setFilterOptions({
      ...filterOptions,
      page: value
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
      <Stack component='ul' gap='md' p='0px' mt='xl' pos='relative'>
        {!isFetching && data?.data ? (
          data.data.length > 0 ? (
            <>
              {data.data.map((props) => (
                <Suspense key={props.id} fallback={<JobCardPlaceholder />}>
                  <JobCard props={props} />
                </Suspense>
              ))}
              <Pagination
                total={data.last_page}
                value={data.current_page}
                onChange={handlePageChange}
              />
            </>
          ) : (
            <NoJobsPlaceholder />
          )
        ) : (
          Array.from({ length: 5 }).map((_, i) => <JobCardPlaceholder key={i} />)
        )}
      </Stack>
    </>
  );
}

export default JobsContainer;
async function fetchJobs(filterOptions: {
  company: string | null;
  status: string | null;
  order: 'desc' | 'asc';
  page: number;
}) {
  const response = await axiosInstance.get('/my-jobs', {
    params: filterOptions
  });
  return response.data;
}
