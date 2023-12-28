import { Route } from '@tanstack/react-router';
import { Group } from '@mantine/core';

import { portalLayoutRoute } from '../../layouts/portal-layout';
import CreateJobModal from '../../components/jobs/create-job-modal';
import JobsContainer from '../../components/jobs/jobs-container';

export function Jobs() {
  return (
    <div>
      <Group justify='space-between'>
        <h1>Jobs Advertisements</h1>
        <CreateJobModal />
      </Group>
      <section>
        <JobsContainer />
      </section>
    </div>
  );
}

export const jobsRoute = new Route({
  path: 'jobs',
  component: Jobs,
  getParentRoute: () => portalLayoutRoute
});
