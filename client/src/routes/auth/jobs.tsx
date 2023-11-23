import { Route } from '@tanstack/react-router';
import { defaultRoute } from '../default-layout';

export function Jobs() {
  return <h1>Jobs CONTEEEENT</h1>;
}

export const jobsRoute = new Route({
  path: 'jobs',
  component: Jobs,
  getParentRoute: () => defaultRoute
});
