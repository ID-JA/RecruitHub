import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../layouts/portal-layout';

function Messages() {
  return (
    <div>
      <h1>Messages</h1>
    </div>
  );
}

export const messagesRoute = new Route({
  component: Messages,
  path: 'messages',
  getParentRoute: () => portalLayoutRoute
});
