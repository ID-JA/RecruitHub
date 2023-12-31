import { Outlet, Route, useRouterState } from '@tanstack/react-router';
import { MainHeader } from '../components/shared';
import { rootRoute } from '../routes/Router';
import { Background } from '../components/shared/Background/Background';
import { currentUserQueryOptions, useCurrentUser } from './portal-layout';
import { useEffect } from 'react';
import { useAuthStore } from '../store';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { queryClient } from '../App';

const excludedLinks = ['/login', '/signup', '/forgot-password'];

const DefaultLayout = (): JSX.Element => {
  const state = useRouterState();
  const user = useSuspenseQuery(currentUserQueryOptions);
  const { setUser, toggleUserFetching, isFetchingUser } = useAuthStore();
  const navigate = useNavigate();
  // useCurrentUser();
  useEffect(() => {
    toggleUserFetching();
    if (user.data.role !== 'recruiter') {
      navigate({
        replace: true,
        to: '/'
      });
    }
    if (user.data) {
      toggleUserFetching();

      setUser(user.data);
    }
  }, [user.isFetching, user.data, user.isFetched]);
  return (
    <>
      <Background />
      {!excludedLinks.some((link) => state.location.href.includes(link)) && <MainHeader />}
      <Outlet />
    </>
  );
};
export const defaultLayoutRoute = new Route({
  id: 'default-layout',
  getParentRoute: () => rootRoute,
  component: DefaultLayout,
  loader: () => queryClient.ensureQueryData(currentUserQueryOptions)
});
