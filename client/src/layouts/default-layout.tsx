import { Outlet, Route, useRouter } from '@tanstack/react-router';
import { MainHeader } from '../components/shared';
import { rootRoute } from '../routes/Router';
import { Background } from '../components/shared/Background/Background';

const excludedLinks = ['/login', '/signup'];

const DefaultLayout = (): JSX.Element => {
  const router = useRouter();
  console.log('🚀 ~ file: default-layout.tsx:10 ~ DefaultLayout ~ router:', router.state);
  console.log('🚀 ~ file: default-layout.tsx:7 ~ excludedLinks:', excludedLinks);
  return (
    <>
      {router.state.location.href !== '/jobs-board' && <Background />}
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
