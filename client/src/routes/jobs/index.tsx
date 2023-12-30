import { Route } from '@tanstack/react-router';
import { Button, Group } from '@mantine/core';

import { portalLayoutRoute } from '../../layouts/portal-layout';
import { useAddEditJobOffer } from '../../components/jobs/create-job-modal';
import JobsContainer from '../../components/jobs/jobs-container';
import { z } from 'zod';

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

const jobSearchParamsSchema = z.object({
  page: z.number().catch(1),
  company: z.number().optional(),
  status: z.string().optional()
});

type JobParams = z.infer<typeof jobSearchParamsSchema>;

export const jobsRoute = new Route({
  path: 'jobs',
  component: Jobs,
  getParentRoute: () => portalLayoutRoute,
  validateSearch: jobSearchParamsSchema
});
