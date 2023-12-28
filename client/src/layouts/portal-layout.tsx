import { Link, Outlet, Route } from '@tanstack/react-router';
import { PortalNavbar } from '../components/shared/Navbar/PortalNavbar';
import { rootRoute } from '../routes/Router';

import { useDisclosure } from '@mantine/hooks';
import { ActionIcon, AppShell, Avatar, Box, Container, Group, Loader, Menu, rem } from '@mantine/core';
import { RecruitHubLogo } from '../components/shared/logo/logo';
import { IconBellRinging2, IconBellRinging2Filled, IconCaretLeft, IconCaretRight, IconLogout, IconNotification } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utils';
import { IconSettings } from '@tabler/icons-react';
import { IconUserCircle } from '@tabler/icons-react';
import { useAuthStore } from '../store';
import { Fragment, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';
import { notifications } from '@mantine/notifications';


export function PortalLayout() {
  const [myNotifications,setMyNotifications]=useState([])
  const [notificationLoading,setNotificationLoading]=useState(true)

  const [unReadNotificationsCount,setUnReadNotificationsCount]=useState([])
  const [opened, { toggle }] = useDisclosure();
  window.Pusher = Pusher;
  Echo.logToConsole = true;
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: '61bc94533d695032d318',
    cluster: 'eu',
    encrypted: true
  });


  const { setUser, isLoggedIn ,user} = useAuthStore();

  useQuery({
    queryKey: ['current-user'],
    queryFn: async () => {
      const response = await axiosInstance.get('/user');
      setUser(response.data);
      return response.data;
    }
  });
  useEffect(() => {
    const channel = window.Echo.channel(`App.Models.User.${user&&user.id}`);
    channel.listen('.Notifications', function (data: object) {
      notifications.show({
        color: 'green',
        title: data.title,
        message: data.body
      });
      axiosInstance.post(`/notifications/read/${data.id}`)

    });
    return () => {
      window.Echo.leave(`App.Models.User.${user&&user.id}`);
    };
  }, [isLoggedIn,user]);
  if (!isLoggedIn) {
    return null;
  }
  const getNotifications=async()=>{
    const response =await axiosInstance.get('/notifications');
    setMyNotifications(response.data.notifications)
    setUnReadNotificationsCount(response.data.unreadNotificationsCount)
    setNotificationLoading(false)
    await axiosInstance.post('/notifications/read-all');
  }
  const clearNotifications=async()=>{
    const response =await axiosInstance.delete('/notifications/destroy');
    setMyNotifications([])
    if(response.data){
      notifications.show({
        color: 'green',
        title: "Success",
        message: "You have successfully cleared the notifiactions!"
      });
    }
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
          <Menu shadow='md' width={200}>
            <Menu.Target>
              <Avatar src='' />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item
                leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}
              >
                Profile hello
              </Menu.Item>
              <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                Settings
              </Menu.Item>
              <Menu.Item leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Menu onClose={()=>{setTimeout(()=>{setNotificationLoading(true)},1000)}} onOpen={getNotifications} shadow='md' width={300}>
            <Menu.Target>
              <IconBellRinging2 size={28}/>
            </Menu.Target>

            <Menu.Dropdown style={{ maxHeight:'400px',overflow:'auto' }} >
            <Group justify='space-between'>
              <Menu.Label>Notifications {unReadNotificationsCount&&unReadNotificationsCount}</Menu.Label>
              {myNotifications.length>0&&<b onClick={clearNotifications} style={{ fontSize:'x-small',color:'#228be6',cursor:"pointer" }}>Clear all Notifications</b>}
            </Group>
            
              {notificationLoading?
              <Group h='100%' px='md' mx='xl' justify='center'>
                <Loader color="cyan" size="lg" type="dots" />
              </Group>
              :
              myNotifications.length>0?
              myNotifications.map((e,i)=>(
                <Fragment key={i}>
                  <Menu.Item >
                    <div style={{ fontSize:'smaller',color:`${e.read_at?'#00000099':'black'}` }}>
                      <b>{e.data.title}</b>
                      <div>{e.data.body}</div>
                    </div>
                  </Menu.Item>
                </Fragment>
              ))  
              :
              <Menu.Item >
                  <b>You havn't received any notifications!</b> 
              </Menu.Item>
              }
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
  component: PortalLayout
});
