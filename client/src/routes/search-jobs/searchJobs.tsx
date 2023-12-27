import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../../layouts/default-layout';

export function searchJobs() {
  return <h1>I am Sign up page</h1>;
}

export const searchJobRoute = new Route({
  path: 'search-jobs',
  component: searchJobs,
  getParentRoute: () => defaultLayoutRoute
});
