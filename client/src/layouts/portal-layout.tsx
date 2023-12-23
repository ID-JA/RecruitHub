import { Link, Outlet, Route, redirect } from '@tanstack/react-router';
import { PortalNavbar } from '../components/shared/Navbar/PortalNavbar';
import { rootRoute } from '../routes/Router';

import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, AppShell, Box, Container, Group } from '@mantine/core';
import { RecruitHubLogo } from '../components/shared/logo/logo';
import { IconCaretLeft, IconCaretRight } from '@tabler/icons-react';
import { jwtDecode } from 'jwt-decode';

export function PortalLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}
      padding='md'
    >
      <AppShell.Header>
        <Group h='100%' px='md'>
          <Link
            to='/portal'
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <RecruitHubLogo />
          </Link>
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
  beforeLoad: async ({ location }) => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href
        }
      });
    }
  }
});
const isAuthenticated = () => {
  const user = getUserFromAppState();
  if (user) {
    return true;
  }

  const token = localStorage.getItem('token');
  console.log(isValidToken(token));
  if (token && isValidToken(token)) {
    return true;
  }

  return false;
};

const getUserFromAppState = () => {
  return null;
};

const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp && decodedToken.exp > currentTime;
};
