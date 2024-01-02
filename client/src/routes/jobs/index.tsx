import { Route } from '@tanstack/react-router';
import { Button, Group } from '@mantine/core';

import { portalLayoutRoute } from '../../layouts/portal-layout';
import { useAddEditJobOffer } from '../../components/jobs/create-job-modal';
import JobsContainer from '../../components/jobs/jobs-container';
import { z } from 'zod';

export function Jobs() {
  return (
    <div>
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

export const jobsRoute = new Route({
  path: 'jobs',
  component: Jobs,
  getParentRoute: () => portalLayoutRoute,
  validateSearch: jobSearchParamsSchema
});
