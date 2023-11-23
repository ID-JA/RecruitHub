import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../layouts/portal-layout';

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
}

export const settingsRoute = new Route({
  component: Settings,
  path: 'settings',
  getParentRoute: () => portalLayoutRoute
});
