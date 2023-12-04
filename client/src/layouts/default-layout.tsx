import { Outlet, Route, useRouter } from '@tanstack/react-router';
import { MainHeader } from '../components/shared';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { rootRoute } from '../routes/Router';
import { Background } from '../components/shared/Background/Background';

const excludedLinks = ['/login', '/signup'];

const DefaultLayout = (): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <Background />
      {!excludedLinks.includes(router.state.location.href) && <MainHeader />}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const defaultLayoutRoute = new Route({
  path: '/',
  getParentRoute: () => rootRoute,
  component: DefaultLayout
});
