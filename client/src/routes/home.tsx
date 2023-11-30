import { Route } from '@tanstack/react-router';
import { defaultLayoutRoute } from '../layouts/default-layout';

function HomePage() {
  return (
    <>
      <h1>HELLO</h1>
      This is home page
    </>
  );
}

export const homePageRoute = new Route({
  path: '/',
  id: 'home-page',
  component: HomePage,
  getParentRoute: () => defaultLayoutRoute
});
