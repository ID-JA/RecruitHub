import { Menu, ActionIcon, Group, Loader, Avatar, rem, UnstyledButton, Badge, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconBellRinging2, IconUserCircle, IconSettings, IconLogout } from '@tabler/icons-react';

import { useNavigate } from '@tanstack/react-router';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../utils';
import { ColorSchemaToggle } from './theme-toggler/color-schema-toggle';
import { NotificationData } from '../../types';
import { TUser, useAuthStore } from '../../store';
import { IconMessageCircle2 } from '@tabler/icons-react';

function UserToolbar() {
  const [myNotifications, setMyNotifications] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(true);
  const [chats,setChats]=useState([])
  const [chatsLoading,setChatsLoading]=useState(true)
  const [chatsUnreadMessages,setChatsUnreadMessages]=useState(0)
 

  const [unReadNotificationsCount, setUnReadNotificationsCount] = useState(0);

  const { logout, isLoggedIn, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    window.Pusher = Pusher;
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
  const getNotifications = async () => {
    try {
      const response = await axiosInstance.get('/notifications');
      setMyNotifications(response.data.notifications);
      setUnReadNotificationsCount(response.data.unreadNotificationsCount);
      setNotificationLoading(false);
    } catch (error) {
      console.error('Error fetching notifications:', error);  
      alert('An error occurred while fetching notifications. Please try again.');
    }
  };
  
  const getMessages = async () => {
    try {
      const response = await axiosInstance.get('/chats');
      setChats(response.data.chats);
      setChatsUnreadMessages(response.data.totalUnreadMessage);
      setChatsLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      alert('An error occurred while fetching messages. Please try again.');
    }
  };
  const markMessageRead=async()=>{
    if(chatsUnreadMessages>0){
      try {
        const response = await axiosInstance.post('/chats/messages/read-all');
        setChatsUnreadMessages(0);
      } catch (error) {
        console.error('Error ', error);
        alert('An error occurred. Please try again.');
      }
    }
  }
  const markNotificationsRead=async()=>{
    if(unReadNotificationsCount>0){
      try {
        const response = await axiosInstance.post('/notifications/read-all');
        setUnReadNotificationsCount(0);
      } catch (error) {
        console.error('Error ', error);
        alert('An error occurred. Please try again.');
      }
    }
  }
  

  useEffect(() => {
    getNotifications()
    getMessages();
  }, []); 
  
  return (
    <>
      <ColorSchemaToggle />
      <Menu
        onClose={() => {
          setTimeout(() => {
            setChatsLoading(true);
          }, 1000);
          markMessageRead()
        }}
        onOpen={getMessages}
        shadow='md'
        width={300}
      >
        <Menu.Target>
          <ActionIcon variant='subtle' color='gray' size='lg' aria-label='Exit full screen'>
            <IconMessageCircle2 style={{ width: '100%', height: '100%',position:'relative' }} />
            <span
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              padding: '1px',
              fontSize: '10px',
              color: 'white',
              fontWeight: 'bold',
              top: '4px',
              right: '1px',
              height:'12px',
              width:'12px',
              borderRadius: '50%',
              display:`${chatsUnreadMessages==0?'none':'block'}`
            }}
            >
            </span>
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown style={{ maxHeight: '400px', overflow: 'auto' }}>
          <Group justify='space-between'>
            <Menu.Label>
              Messages
            </Menu.Label>
          </Group>

          {chatsLoading ? (
            <Group h='100%' px='md' mx='xl' justify='center'>
              <Loader type='dots' />
            </Group>
          ) : chats.length > 0 ? (
            chats.map((e: any, i) => (
              <Menu.Item key={i}>
                    <UnstyledButton
                      onClick={() => {
                        navigate({
                          replace: true,
                          to: user?.role=='candidate'?'/messages':'/portal/messages'
                        });
                      }}
                      key={i}
                    >
                      <Group>
                        <Avatar
                          src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
                          radius='xl'
                        />
                        <div style={{ flex: 1 }}>
                          <Text c='#4f4f4f' size='sm' fw={500}>
                            {e.users[0].name}
                          </Text>
                          <Group justify='space-between'>
                            <Text
                              c={e.latest_message.read_at ? '#4f4f4f' : 'black'}
                              fw={'bold'}
                              size='xs'
                            >
                              {e.latest_message.message}.
                            </Text>
                            {e.unreadMessagesCount && (
                              <Badge color='blue' fw={'bolder'} size='xs'>
                                {e.unreadMessagesCount}
                              </Badge>
                            )}
                          </Group>
                        </div>
                      </Group>
                    </UnstyledButton>
                  
              </Menu.Item>
            ))
          ) : (
            <Menu.Item ta='center' fw='bold'>
              You haven't received any Message!
            </Menu.Item>
          )}
        </Menu.Dropdown>
      </Menu>
      <Menu
        onClose={() => {
          setTimeout(() => {
            setNotificationLoading(true);
          }, 1000);
          markNotificationsRead()
        }}
        onOpen={getNotifications}
        shadow='md'
        width={300}
      >
        <Menu.Target>
          <ActionIcon variant='subtle' color='gray' size='lg' aria-label='Exit full screen'>
            <IconBellRinging2 style={{ width: '100%', height: '100%',position:'relative'}} />
            <span
            style={{
              position: 'absolute',
              backgroundColor: 'red',
              padding: '1px',
              fontSize: '10px',
              color: 'white',
              fontWeight: 'bold',
              top: '4px',
              right: '1px',
              height:'12px',
              width:'12px',
              borderRadius: '50%',
              display:`${unReadNotificationsCount==0?'none':'block'}`
            }}
            >
            </span>
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
          <Menu.Label>{user?.name}</Menu.Label>
          <Menu.Item leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
            Profile
          </Menu.Item>
          <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
            Settings
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              navigate({
                to: '/',
                replace: true
              });
              logout();
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
