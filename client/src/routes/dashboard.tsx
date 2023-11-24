import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../layouts/portal-layout';

function Dashboard() {
  return <div>this is dashboard page</div>;
}

export const dashboardRoute = new Route({
  path: '/',
  getParentRoute: () => portalLayoutRoute,
  component: Dashboard
});
