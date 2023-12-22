import { Stack } from '@mantine/core';
import JobCard from './job-card';
import { Suspense } from 'react';
import JobCardPlaceholder from './job-card-placeholder';
import NoJobsPlaceholder from './no-job-palceholder';

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
function JobsContainer() {
  return (
    <>
      {/* Filters */}
      {/* Search */}
      <Stack component='ul' gap='md' p='0px'>
        {jobs ? (
          jobs.length > 0 ? (
            jobs.map((props) => (
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
