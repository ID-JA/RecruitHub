import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../layouts/portal-layout';

function Candidates() {
  return (
    <div>
      <h1>Candidates</h1>
    </div>
  );
}

export const candidatesRoute = new Route({
  component: Candidates,
  path: 'candidates',
  getParentRoute: () => portalLayoutRoute
});
