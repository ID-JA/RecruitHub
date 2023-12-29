import { Link, Outlet, Route, redirect, useRouter } from '@tanstack/react-router';
import { PortalNavbar } from '../components/shared/Navbar/PortalNavbar';
import { rootRoute } from '../routes/Router';

import { useDisclosure } from '@mantine/hooks';
import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Container,
  Group,
  Loader,
  Menu,
  rem
} from '@mantine/core';
import { RecruitHubLogo } from '../components/shared/logo/logo';
import { IconBellRinging2, IconCaretLeft, IconCaretRight, IconLogout } from '@tabler/icons-react';
import { useQueries } from '@tanstack/react-query';
import { axiosInstance } from '../utils';
import { IconSettings } from '@tabler/icons-react';
import { IconUserCircle } from '@tabler/icons-react';
import { ICompanyData, useAuthStore } from '../store';
import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { notifications } from '@mantine/notifications';

export function PortalLayout() {
  const [myNotifications, setMyNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(true);

  const [unReadNotificationsCount, setUnReadNotificationsCount] = useState([]);
  const [opened, { toggle }] = useDisclosure();

  const { setUser, setCompanies, logout, setSelectedCompany, isLoggedIn, user } = useAuthStore();
  const router = useRouter();
  useQueries({
    queries: [
      {
        queryKey: ['current-user'],
        queryFn: async () => {
          const response = await axiosInstance.get('/user');
          setUser(response.data);
          return response.data;
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false
      },
      {
        queryKey: ['user-companies'],
        queryFn: async () => {
          const response = await axiosInstance.get('/company');
          if (response.data.length) {
            setCompanies(
              response.data.length > 0 &&
                response.data.map((item: ICompanyData) => ({
                  value: item.id.toString(),
                  label: item.title
                }))
            );
            setSelectedCompany({
              value: response.data[0].id.toString(),
              label: response.data[0].title
            });
          }
          return response.data.length;
        },
        staleTime: Infinity,
        refetchOnWindowFocus: false
      }
    ]
  });

  // useEffect(() => {
  //   window.Pusher = Pusher;
  //   Echo.logToConsole = true;
  //   window.Echo = new Echo({
  //     broadcaster: import.meta.env.VITE_ECHO_BROADCASTER,
  //     key: import.meta.env.VITE_ECHO_KEY,
  //     cluster: import.meta.env.VITE_ECHO_CLUSTER,
  //     encrypted: import.meta.env.VITE_ECHO_ENCRYPTED
  //   });

  //   const channel = window.Echo.channel(`App.Models.User.${user && user.id}`);
  //   channel.listen('.Notifications', function (data: object) {
  //     notifications.show({
  //       color: 'green',
  //       title: data.title,
  //       message: data.body
  //     });
  //     axiosInstance.post(`/notifications/read/${data.id}`);
  //   });
  //   return () => {
  //     window.Echo.leave(`App.Models.User.${user && user.id}`);
  //   };
  // }, [isLoggedIn, user]);

  const getNotifications = async () => {
    const response = await axiosInstance.get('/notifications');
    setMyNotifications(response.data.notifications);
    setUnReadNotificationsCount(response.data.unreadNotificationsCount);
    setNotificationLoading(false);
    await axiosInstance.post('/notifications/read-all');
  };
  const clearNotifications = async () => {
    const response = await axiosInstance.delete('/notifications/destroy');
    setMyNotifications([]);
    if (response.data) {
      notifications.show({
        color: 'green',
        title: 'Success',
        message: 'You have successfully cleared the notifiactions!'
      });
    }
  };

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
                <Menu.Item
                  leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}
                >
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
            <Menu
              onClose={() => {
                setTimeout(() => {
                  setNotificationLoading(true);
                }, 1000);
              }}
              onOpen={getNotifications}
              shadow='md'
              width={300}
            >
              <Menu.Target>
                <ActionIcon variant='subtle' color='gray' size='lg' aria-label='Exit full screen'>
                  <IconBellRinging2 style={{ width: '70%', height: '70%' }} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown style={{ maxHeight: '400px', overflow: 'auto' }}>
                <Group justify='space-between'>
                  <Menu.Label>
                    Notifications {unReadNotificationsCount && unReadNotificationsCount}
                  </Menu.Label>
                  {myNotifications.length > 0 && (
                    <b
                      onClick={clearNotifications}
                      style={{ fontSize: 'x-small', color: '#228be6', cursor: 'pointer' }}
                    >
                      Clear all Notifications
                    </b>
                  )}
                </Group>

                {notificationLoading ? (
                  <Group h='100%' px='md' mx='xl' justify='center'>
                    <Loader type='dots' />
                  </Group>
                ) : myNotifications.length > 0 ? (
                  myNotifications.map((e, i) => (
                    <Menu.Item key={i}>
                      <div
                        style={{
                          fontSize: 'smaller',
                          color: `${e.read_at ? '#00000099' : 'black'}`
                        }}
                      >
                        <b>{e.data.title}</b>
                        <div>{e.data.body}</div>
                      </div>
                    </Menu.Item>
                  ))
                ) : (
                  <Menu.Item ta='center' fw='bold'>
                    You haven't received any notifications!
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
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
  beforeLoad: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw redirect({
        to: '/'
      });
    }
    try {
      const { data } = await axiosInstance.get('/user');
      if (!data || !data.id || data.role !== 'recruiter') {
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
