import { Link, Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../../layouts/portal-layout';
import {Group,Button} from "@mantine/core"
import { IconPlus } from '@tabler/icons-react';
import CreateJobModal from '../../components/jobs/CreateJobModal';

export function Jobs() {
  return (
    <div>
      <Group justify='space-between'>
        <h1>Jobs (List of jobs)</h1>
          <CreateJobModal/>
      </Group>
    </div>
  );
}

export const jobsRoute = new Route({
  path: 'jobs',
  component: Jobs,
  getParentRoute: () => portalLayoutRoute
});
