import { Link, Outlet, Route, redirect, useRouter } from '@tanstack/react-router';
import { PortalNavbar } from '../components/shared/Navbar/PortalNavbar';
import { rootRoute } from '../routes/Router';

import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, AppShell, Avatar, Box, Container, Group, Menu, rem } from '@mantine/core';
import { RecruitHubLogo } from '../components/shared/logo/logo';
import { IconCaretLeft, IconCaretRight, IconLogout } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utils';
import { IconSettings } from '@tabler/icons-react';
import { IconUserCircle } from '@tabler/icons-react';
import { useAuthStore } from '../store';

export function PortalLayout() {
  const [opened, { toggle }] = useDisclosure();

  const { setUser, isLoggedIn, logout } = useAuthStore();
  const router = useRouter();
  useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await axiosInstance.get('/user');
      setUser(response.data);
      return response.data;
    }
  });

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
          <Menu shadow='md' width={200}>
            <Menu.Target>
              <Avatar src='' />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item
                leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}
              >
                Profile
              </Menu.Item>
              <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                Settings
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  logout();
                  router.history.replace('/');
                }}
                leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
              >
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
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
  beforeLoad: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw redirect({
        to: '/'
      });
    }
    try {
      const { data } = await axiosInstance.get('/user');
      if (!data || !data.id) {
        localStorage.removeItem('token');
        throw redirect({
          to: '/'
        });
      }
    } catch (error) {
      localStorage.removeItem('token');
      throw redirect({
        to: '/'
      });
    }
  }
});
