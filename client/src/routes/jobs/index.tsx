import { Route } from '@tanstack/react-router';
import { Button, Group } from '@mantine/core';

import { portalLayoutRoute } from '../../layouts/portal-layout';
import { useAddEditJobOffer } from '../../components/jobs/create-job-modal';
import JobsContainer from '../../components/jobs/jobs-container';

export function Jobs() {
  const { AddEditJobOfferModal, openAddEditJobOfferModal } = useAddEditJobOffer();
  return (
    <div>
      <AddEditJobOfferModal />
      <Group justify='space-between'>
        <h1>Jobs Advertisements</h1>
        <Button onClick={openAddEditJobOfferModal}>Create Job</Button>
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
