import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../../layouts/portal-layout';

function Jobs() {
  return (
    <div>
      <h1>Jobs (List of jobs)</h1>
    </div>
  );
}

export const jobsRoute = new Route({
  path: 'jobs',
  component: Jobs,
  getParentRoute: () => portalLayoutRoute
});
