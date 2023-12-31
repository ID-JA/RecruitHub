import { Link, Outlet, Route, redirect, useNavigate } from '@tanstack/react-router';
import { PortalNavbar } from '../components/shared/Navbar/PortalNavbar';
import { rootRoute } from '../routes/Router';

import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, AppShell, Box, Container, Group } from '@mantine/core';
import { RecruitHubLogo } from '../components/shared/logo/logo';
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react';
import { queryOptions, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utils';
import { useAuthStore } from '../store';
import { useEffect } from 'react';
import UserToolbar from '../components/shared/user-toolbar';
import { queryClient } from '../App';

export const useCurrentUser = () => {
  const { setUser, logout, isLoggedIn, user, toggleUserFetching } = useAuthStore();
  const userQuery = useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await axiosInstance.get('/user');
      setUser(response.data);
      return response.data;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: isLoggedIn === false
  });

  useEffect(() => {
    toggleUserFetching();
  }, [userQuery.isFetching]);

  return {
    isLoggedIn,
    user,
    logout,
    userQuery
  };
};

const fetchUser = async () => {
  const response = await axiosInstance.get('/user');
  return response.data;
};

export const currentUserQueryOptions = queryOptions({
  queryKey: ['authenticated-user'],
  queryFn: fetchUser
});

export function PortalLayout() {
  const [opened, { toggle }] = useDisclosure();
  const user = useSuspenseQuery(currentUserQueryOptions);
  const { setUser, toggleUserFetching } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    toggleUserFetching();
    if (user.data.role !== 'recruiter') {
      navigate({
        replace: true,
        to: '/'
      });
    }
    if (user.data) {
      setUser(user.data);
    }
  }, [user.isFetching]);

  if (!user.data) {
    return null;
  }
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md' mx='xl' justify='space-between'>
          <Link
            to='/portal'
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RecruitHubLogo />
          </Link>
          <Group>
            <UserToolbar />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <Box
          p='md'
          style={{
            position: 'relative',
            height: 'inherit'
          }}
        >
          <ActionIcon
            variant='filled'
            aria-label='Settings'
            radius='lg'
            onClick={toggle}
            styles={{
              root: {
                position: 'absolute',
                top: '50%',
                right: opened ? '-15px' : '-20px'
              }
            }}
          >
            {opened ? (
              <IconCaretLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
            ) : (
              <IconCaretRight style={{ width: '70%', height: '70%' }} stroke={1.5} />
            )}
          </ActionIcon>
          <PortalNavbar />
        </Box>
      </AppShell.Navbar>
      <AppShell.Main>
        <Container size='lg'>
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}

export const portalLayoutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: 'portal',
  component: PortalLayout,
  loader: () => queryClient.ensureQueryData(currentUserQueryOptions)

  // beforeLoad: async () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     throw redirect({
  //       to: '/'
  //     });
  //   }
  //   try {
  //     const { data } = await axiosInstance.get('/user');
  //     if (!data || !data.id || data.role !== 'recruiter') {
  //       localStorage.removeItem('token');
  //       throw redirect({
  //         to: '/'
  //       });
  //     }
  //   } catch (error) {
  //     localStorage.removeItem('token');
  //     throw redirect({
  //       to: '/'
  //     });
  //   }
  // }
});
