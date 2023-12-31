import { Menu, ActionIcon, Group, Loader, Avatar, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconBellRinging2, IconUserCircle, IconSettings, IconLogout } from '@tabler/icons-react';
import { useRouter } from '@tanstack/react-router';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useState, useEffect } from 'react';
import { useCurrentUser } from '../../layouts/portal-layout';
import { axiosInstance } from '../../utils';
import { ColorSchemaToggle } from './theme-toggler/color-schema-toggle';
import { NotificationData } from '../../types';
import { TUser, useAuthStore } from '../../store';

function UserToolbar() {
  const [myNotifications, setMyNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(true);

  const [unReadNotificationsCount, setUnReadNotificationsCount] = useState([]);

  const { logout, isLoggedIn, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    window.Pusher = Pusher;
    // Echo.logToConsole = true;
    window.Echo = new Echo({
      broadcaster: import.meta.env.VITE_ECHO_BROADCASTER,
      key: import.meta.env.VITE_ECHO_KEY,
      cluster: import.meta.env.VITE_ECHO_CLUSTER,
      encrypted: import.meta.env.VITE_ECHO_ENCRYPTED
    });

    const channel = window.Echo.channel(`App.Models.User.${user && user.id}`);
    channel.listen('.Notifications', function (data: NotificationData) {
      notifications.show({
        color: 'green',
        title: data.title,
        message: data.body
      });
      axiosInstance.post(`/notifications/read/${data.id}`);
    });
    return () => {
      window.Echo.leave(`App.Models.User.${user && user.id}`);
    };
  }, [isLoggedIn, user]);

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
    <>
      <ColorSchemaToggle />
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
            myNotifications.map((e: any, i) => (
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
      <Menu shadow='md' width={200}>
        <Menu.Target>
          <Avatar src='' />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
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
    </>
  );
}

export default UserToolbar;
