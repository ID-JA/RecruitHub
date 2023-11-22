import { Route } from '@tanstack/react-router';
import { defaultRoute } from '../default-layout';

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
  getParentRoute: () => defaultRoute
});
