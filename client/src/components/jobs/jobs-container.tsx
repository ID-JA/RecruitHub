import { Box, Group, Pagination, Select, Skeleton, Stack } from '@mantine/core';
import JobCard from './job-card';
import { Suspense, useEffect, useState } from 'react';
import JobCardPlaceholder from './job-card-placeholder';
import NoJobsPlaceholder from './no-job-palceholder';
import { keepPreviousData, useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../utils';
import { ICompanyData, useAuthStore } from '../../store';
import { NoCompanyPlaceHolder } from '../companies/no-company-placeholder';

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
  const { selectedCompany, companies, setCompanies, setSelectedCompany } = useAuthStore();
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
          return response.data.length;
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false
      },
      {
        queryKey: ['my-jobs', filterOptions],
        queryFn: () => fetchJobs(filterOptions),
        placeholderData: keepPreviousData,
        staleTime: 5000
      }
    ]
  });
  // Prefetch the next page!
  useEffect(() => {
    const hasMore = queryJobs.data?.to != queryJobs.data?.total;
    if (!queryJobs.isPlaceholderData && hasMore) {
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
  }, [queryJobs.data, queryJobs.isPlaceholderData, filterOptions, queryClient]);

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
      {queryCompanies.isFetching || queryJobs.isFetching ? (
        <Box mt='xl'>
          <Group mb='lg'>
            <Skeleton height={28} width='20%' />
            <Skeleton height={28} width='20%' />
            <Skeleton height={28} width='20%' />
          </Group>
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
          {queryJobs.data.data.map((props) => (
            <Suspense key={props.id} fallback={<JobCardPlaceholder />}>
              <JobCard props={props} />
            </Suspense>
          ))}
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
