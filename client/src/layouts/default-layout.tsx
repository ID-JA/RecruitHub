import { Outlet, Route, useRouter } from '@tanstack/react-router';
import { MainHeader } from '../components/shared';
import { rootRoute } from '../routes/Router';
import { Background } from '../components/shared/Background/Background';

const excludedLinks = ['/login', '/signup', '/forgot-password'];

const DefaultLayout = (): JSX.Element => {
  const router = useRouter();
  return (
    <>
      <Background />
      {!excludedLinks.includes(router.state.location.href) && <MainHeader />}
      <Outlet />
    </>
  );
};

export const defaultLayoutRoute = new Route({
  id: 'default-layout',
  getParentRoute: () => rootRoute,
  component: DefaultLayout
});
