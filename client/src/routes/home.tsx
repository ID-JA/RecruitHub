import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../layouts/default-layout';

function HomePage() {
  return (
    <div>
      <h1>I am home page</h1>
    </div>
  );
}

export const homePageRoute = new Route({
  path: '/home',
  component: HomePage,
  getParentRoute: () => defaultLayoutRoute
});
