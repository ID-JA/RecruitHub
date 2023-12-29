import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../layouts/portal-layout';
import { Grid, Skeleton, Container, Input, Badge, Paper, Image } from '@mantine/core';
import { UnstyledButton, Group, Avatar, Text } from '@mantine/core';
import classes from './message.module.css';
import logo from '../assets/apple-touch-icon.png';
import { useEffect, useRef, useState } from 'react';
import { ScrollArea, Stack } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { axiosInstance } from '../utils';
import { useAuthStore } from '../store';
import { IconChecks } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import { formatDate } from '../utils/formatDate';
import { IconCircleArrowDownFilled } from '@tabler/icons-react';
import './messages.css';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import aud from '../assets/notify.mp3';
function Messages() {
  const [chats, setChats] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState(null);
  const [chatId, setChatId] = useState(null);
  const { user } = useAuthStore();
  // const [soundMute,setSoundMute]=useState(true)
  const [isDiv1Visible, setDiv1Visibility] = useState(false);

  const toggleVisibility = () => {
    setDiv1Visibility(false);
  };

  useEffect(() => {
    axiosInstance.get('/chats').then((data) => {
      setChats(data.data.chats);
    });
  }, []);

  const sound = new Audio(aud);
  // sound.muted = soundMute;
  const playSound = () => {
    sound.play();
  };
  useEffect(() => {
    const channel = window.Echo.channel(`chat.${user.id}`);
    channel.listen('.MessageSent', function (data: object) {
      setConversation((prevArray) => [...prevArray, data.message]);
      playSound();
    });
    return () => {
      window.Echo.leave(`chat.${user.id}`);
    };
  }, []);

  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });

  useEffect(() => {
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'auto' });
  }, [conversation]);

  const getConveration = async (id, receive) => {
    setConversation([]);
    setDiv1Visibility(true);
    setChatId(id);
    setReceiver(receive);
    const response = await axiosInstance.get(`/chats/${id}`);
    setChats((prevChats) => {
      return prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, unreadMessagesCount: null } : chat
      );
    });
    //NOTE the state of unread count didn't change // need to be rerender
    setConversation(response.data.messages);
    await axiosInstance.post(`/chats/messages/mark-as-read/${receive.id}`);
  };

  const handleSubmit = async () => {
    setMessage('');
    const formattedDate = new Date().toISOString().slice(0, -1) + '000000Z';
    const newMessage = {
      id: 1,
      user_id: user.id,
      receiver_id: receiver.id,
      chat_id: chatId,
      message,
      read_at: null,
      created_at: formattedDate
    };
    setConversation((prevArray) => [...prevArray, newMessage]);
    await axiosInstance.post(`/chats/messages/send`, {
      receiver_id: receiver.id,
      chat_id: chatId,
      message: message
    });
  };
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      await handleSubmit();
    }
  };

  return (
    <Container fluid={true} my='md'>
      <Grid className='container-message'>
        <Grid.Col
          style={{ backgroundColor: 'whitesmoke' }}
          span={{ base: 12, sm: 4 }}
          className={`${!isDiv1Visible ? 'mobile-visible' : 'mobile-hidden'}`}
        >
          <Group>
            <Stack align='center' w={'100%'}>
              <ScrollArea style={{ height: 'calc(70vh + 50px)' }} viewportRef={viewport} w={'100%'}>
                {chats.length > 0 ? (
                  chats.map((e, i) => (
                    <UnstyledButton
                      onClick={() => {
                        getConveration(e.id, e.users[0]);
                      }}
                      key={i}
                      className={classes.user}
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
                  ))
                ) : (
                  <>
                    <UnstyledButton h={70} className={classes.user}>
                      <Group align='center' justify='space-between'>
                        <Skeleton height={50} circle mb='xl' />
                        <div style={{ flex: 1, height: '65px' }}>
                          <Skeleton height={8} mt={6} radius='xl' />
                          <Skeleton height={8} mt={6} width='70%' radius='xl' />
                        </div>
                      </Group>
                    </UnstyledButton>
                    <UnstyledButton h={70} className={classes.user}>
                      <Group align='center' justify='space-between'>
                        <Skeleton height={50} circle mb='xl' />
                        <div style={{ flex: 1, height: '65px' }}>
                          <Skeleton height={8} mt={6} radius='xl' />
                          <Skeleton height={8} mt={6} width='70%' radius='xl' />
                        </div>
                      </Group>
                    </UnstyledButton>
                  </>
                )}
              </ScrollArea>
            </Stack>
          </Group>
        </Grid.Col>
        <Grid.Col
          span={{ base: 12, sm: 8 }}
          className={`${isDiv1Visible ? 'mobile-visible' : 'mobile-hidden'}`}
        >
          {chatId ? (
            <>
              <Group h={50} className='header-conversation' px='md' justify='space-between'>
                <div className='back-chat-hold'></div>
                <IconArrowNarrowLeft onClick={toggleVisibility} className='back-chat' size={28} />
                <Group align='center'>
                  <b>{receiver.name} </b>
                  <Avatar
                    src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png'
                    radius='xl'
                  />
                </Group>
              </Group>
              <Group>
                <Stack align='center' h={'70vh'} w={'100%'}>
                  <ScrollArea h={'100%'} viewportRef={viewport} w={'100%'}>
                    {conversation.length > 0 ? (
                      conversation.map((e, i) => (
                        <Paper
                          key={i}
                          shadow='xs'
                          radius={12}
                          p={10}
                          fw={'bold'}
                          my={'md'}
                          style={{
                            backgroundColor: e.user_id == user.id ? '#00c4aa7d' : '#f8f8f8',
                            maxWidth: '300px',
                            marginLeft: e.user_id == user.id ? '' : 'auto'
                          }}
                        >
                          <Text size='sm'>{e.message}</Text>
                          <Text size='xs' c='gray'>
                            {formatDate(e.created_at)}
                          </Text>
                          <Group c={e.read_at ? 'blue' : 'gray'}>
                            {e.user_id !== user.id ? (
                              e.read_at ? (
                                <IconChecks />
                              ) : (
                                <IconCheck />
                              )
                            ) : (
                              ''
                            )}
                          </Group>
                        </Paper>
                      ))
                    ) : (
                      <>
                        <Paper
                          shadow='xs'
                          radius={12}
                          p={10}
                          fw={'bold'}
                          my={'md'}
                          style={{
                            backgroundColor: '#00c4aa7d',
                            maxWidth: '300px',
                            marginLeft: 'auto'
                          }}
                        >
                          <Skeleton height={8} radius='xl' />
                          <Skeleton height={8} mt={6} radius='xl' />
                          <Skeleton height={8} mt={6} width='20%' radius='xl' />
                        </Paper>
                        <Paper
                          shadow='xs'
                          radius={12}
                          p={10}
                          fw={'bold'}
                          my={'md'}
                          style={{
                            backgroundColor: '#f8f8f8',
                            maxWidth: '300px'
                          }}
                        >
                          <Skeleton height={8} radius='xl' />
                          <Skeleton height={8} mt={6} radius='xl' />
                          <Skeleton height={8} mt={6} width='20%' radius='xl' />
                        </Paper>
                        <Paper
                          shadow='xs'
                          radius={12}
                          p={10}
                          fw={'bold'}
                          my={'md'}
                          style={{
                            backgroundColor: '#00c4aa7d',
                            maxWidth: '300px',
                            marginLeft: 'auto'
                          }}
                        >
                          <Skeleton height={8} radius='xl' />
                          <Skeleton height={8} mt={6} radius='xl' />
                          <Skeleton height={8} mt={6} width='20%' radius='xl' />
                        </Paper>
                        <Paper
                          shadow='xs'
                          radius={12}
                          p={10}
                          fw={'bold'}
                          my={'md'}
                          style={{
                            backgroundColor: '#f8f8f8',
                            maxWidth: '300px'
                          }}
                        >
                          <Skeleton height={8} radius='xl' />
                          <Skeleton height={8} mt={6} radius='xl' />
                          <Skeleton height={8} mt={6} width='20%' radius='xl' />
                        </Paper>
                      </>
                    )}
                    {conversation.length > 0 && (
                      <IconCircleArrowDownFilled
                        style={{
                          position: 'absolute',
                          bottom: '0px',
                          right: '50px',
                          cursor: 'pointer'
                        }}
                        onClick={scrollToBottom}
                      />
                    )}
                  </ScrollArea>
                  {chatId && (
                    <Group w='100%' justify='center'>
                      <Input
                        onKeyDown={handleKeyDown}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                        w={'85%'}
                        size='md'
                        radius='lg'
                        placeholder='Write a message...'
                      />
                      <IconSend onClick={handleSubmit} />
                    </Group>
                  )}
                </Stack>
              </Group>
            </>
          ) : (
            <Group justify='center' align='center' h={'100%'}>
              <Image radius='md' src={logo} h={200} />
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Start a conversation by selecting a chat on the left or create a new one to fill
                this space with your messages.
              </Text>
            </Group>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export const messagesRoute = new Route({
  component: Messages,
  path: 'messages',
  getParentRoute: () => portalLayoutRoute
});
