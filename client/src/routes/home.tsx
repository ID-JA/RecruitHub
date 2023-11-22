import { Route } from '@tanstack/react-router';
import { defaultRoute } from './default-layout';

function HomePage() {
  return (
    <div>
      <h1>I am home page</h1>
    </div>
  );
}

export const homePageRoute = new Route({
  path: '/',
  component: HomePage,
  getParentRoute: () => defaultRoute
});
