import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../layouts/portal-layout';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../store';

function Dashboard() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  return (
    <div>
      this is dashboard page
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const dashboardRoute = new Route({
  path: '/',
  getParentRoute: () => portalLayoutRoute,
  component: Dashboard
});
