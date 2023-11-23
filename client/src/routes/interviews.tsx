import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../layouts/portal-layout';

function Interviews() {
  return (
    <div>
      <h1>Interviews</h1>
    </div>
  );
}

export const interviewsRoute = new Route({
  component: Interviews,
  path: 'interviews',
  getParentRoute: () => portalLayoutRoute
});
