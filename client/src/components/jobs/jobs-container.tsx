import { Box, Group, Pagination, Select, Stack } from '@mantine/core';
import JobCard from './job-card';
import { Suspense } from 'react';
import JobCardPlaceholder from './job-card-placeholder';
import NoJobsPlaceholder from './no-job-palceholder';
import { useQueries } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { ICompanyData, useAuthStore } from '../../store';
import { NoCompanyPlaceHolder } from '../companies/no-company-placeholder';
import { jobsRoute } from '../../routes/jobs';
import { useNavigate } from '@tanstack/react-router';
import { TJobData } from './create-job-modal';

export interface JobData {
  id: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salary: string; // Assuming salary is stored as a string in the JSON data
  form: string;
  status: string;
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
  const { page, company, status } = jobsRoute.useSearch();
  const navigate = useNavigate();
  const { companies, setCompanies, setSelectedCompany } = useAuthStore();

  const [queryCompanies, queryJobs] = useQueries({
    queries: [
      {
        queryKey: ['user-companies'],
        queryFn: async () => {
          const response = await axiosInstance.get('/company');
          if (response.data.length) {
            setCompanies(
              response.data.length > 0 &&
                response.data.map((item: ICompanyData) => ({
                  value: item.id.toString(),
                  label: item.title
                }))
            );
            setSelectedCompany({
              value: response.data[0].id.toString(),
              label: response.data[0].title
            });
          }
          return response.data;
        },
        refetchOnWindowFocus: false
      },
      {
        queryKey: [
          'my-jobs',
          {
            page,
            company,
            status
          }
        ],
        queryFn: () =>
          fetchJobs({
            company,
            status,
            page
          }),
        staleTime: 5000
      }
    ]
  });

  const handleChangeCompany = (value: string | null) => {
    navigate({
      search: (old) => ({
        ...old,
        company: value ? Number(value) : undefined
      })
    });
  };

  const handleStatusChange = (value: string | null) => {
    navigate({
      search: (old) => ({
        ...old,
        status: value ? value : undefined
      })
    });
  };

  const handlePageChange = (value: number) => {
    navigate({
      search: (old) => ({
        ...old,
        page: value ? value : undefined
      })
    });
  };

  return (
    <>
      <Group mt='xl'>
        <Select
          placeholder='company'
          title='filter by company'
          data={companies}
          value={company?.toString()}
          onChange={handleChangeCompany}
          clearable
        />
        <Select
          placeholder='status'
          title='filter by status'
          value={status}
          onChange={handleStatusChange}
          clearable
          data={['Active', 'Closed', 'Pending', 'Achieve']}
        />
      </Group>
      {queryCompanies.isFetching || queryJobs.isFetching ? (
        <Box mt='xl'>
          <Stack>
            {Array.from({ length: 5 }).map((_, i) => (
              <JobCardPlaceholder key={i} />
            ))}
          </Stack>
        </Box>
      ) : queryCompanies.data.length === 0 ? (
        <NoCompanyPlaceHolder />
      ) : queryJobs.data.data.length === 0 ? (
        <NoJobsPlaceholder />
      ) : (
        <>
          <Stack my='xl'>
            {queryJobs.data.data.map((props: TJobData) => (
              <Suspense key={props.id} fallback={<JobCardPlaceholder />}>
                <JobCard props={props} />
              </Suspense>
            ))}
          </Stack>
          <Pagination
            total={queryJobs.data.last_page}
            value={queryJobs.data.current_page}
            onChange={handlePageChange}
          />
        </>
      )}
    </>
  );
}

export default JobsContainer;
async function fetchJobs(filterOptions: {
  company: number | undefined;
  status: string | undefined;
  // order: 'desc' | 'asc';
  page: number;
}) {
  const response = await axiosInstance.get('/my-jobs', {
    params: filterOptions
  });
  return response.data;
}
