import { Route } from '@tanstack/react-router';
import { portalLayoutRoute } from '../../layouts/portal-layout';
import { Grid, Skeleton, Container, Input, Badge, Paper, Image } from '@mantine/core';
import { UnstyledButton, Group, Avatar, Text } from '@mantine/core';
import classes from './message.module.css';
import logo from '../../assets/apple-touch-icon.png';
import { useEffect, useRef, useState } from 'react';
import { ScrollArea, Stack } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import { axiosInstance } from '../../utils';
import { useAuthStore } from '../../store';
import { IconChecks } from '@tabler/icons-react';
import { IconCheck } from '@tabler/icons-react';
import { formatDate } from '../../utils/formatDate';
import { IconCircleArrowDownFilled } from '@tabler/icons-react';
import './messages.css';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import aud from '../../assets/notify.mp3';
import { defaultLayoutRoute } from '../../layouts/default-layout';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

function Messages() {
  const [chats, setChats] = useState([]);
  const [chatsLoading,setChatsLoading]=useState(true)
  const [conversation, setConversation] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState<any | undefined>();
  const [chatId, setChatId] = useState<string | undefined>();
  const { user } = useAuthStore();
  // const [soundMute,setSoundMute]=useState(true)
  const [isDiv1Visible, setDiv1Visibility] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const chatIdRef = useRef(chatId);

  const filteredChats = chats.filter((chat) =>
    chat.users[0].name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const toggleVisibility = () => {
    setDiv1Visibility(false);
  };

  useEffect(() => {
    chatIdRef.current = chatId; 
  }, [chatId]);

  useEffect(() => {
    axiosInstance.get('/chats').then((data) => {
      setChats(data.data.chats);
      setChatsLoading(false)
  
    });
  }, []);

  const sound = new Audio(aud);
  // sound.muted = soundMute;
  const playSound = () => {
    sound.play();
  };
  window.Pusher = Pusher;
  window.Echo = new Echo({
    broadcaster: import.meta.env.VITE_ECHO_BROADCASTER,
    key: import.meta.env.VITE_ECHO_KEY,
    cluster: import.meta.env.VITE_ECHO_CLUSTER,
    encrypted: import.meta.env.VITE_ECHO_ENCRYPTED
  });
  useEffect(() => {
    const channel = window.Echo.channel(`chat.${user?.id}`);
    channel.listen('.MessageSent', function (data: any) {
      setConversation((prevArray: any) => [...prevArray, data.message]);
      console.log(chatIdRef.current);
      if(data.message){
        if(data.message.chat_id==chatIdRef.current){
          updateUnreadMessage(chatIdRef.current,'clear',data.message)
        }else{
          updateUnreadMessage(data.message.chat_id,'increment',data.message)
        }
      }
      playSound();
    });
    return () => {
      window.Echo.leave(`chat.${user?.id}`);
    };
  }, [user]);

  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });

  useEffect(() => {
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'auto' });
  }, [conversation]);

  const updateUnreadMessage = (id, action, newLatestMessage = null) => {
    setChats((prevChat) =>
      prevChat.map((item) => {
        if (item.id === id) {
          const updatedItem = {
            ...item,
            unreadMessagesCount: action === 'clear' ? 0 : (item.unreadMessagesCount || 0) + 1,
            latest_message: newLatestMessage !== null ? newLatestMessage : item.latest_message,
          };
  
          return updatedItem;
        }
        return item;
      })
    );
  };
  
  
  const getConveration = async (id: string, receive: any) => {
    setConversation([]);
    setDiv1Visibility(true);
    setChatId(id);
    console.log(chats)
    console.log(conversation)
    updateUnreadMessage(id,'clear')
    setReceiver(receive);
    const response = await axiosInstance.get(`/chats/${id}`);
    //NOTE the state of unread count didn't change // need to be rerender
    setConversation(response.data.messages);
    await axiosInstance.post(`/chats/messages/mark-as-read/${receive.id}`);
  };

  const handleSubmit = async () => {
    setMessage('');
    const formattedDate = new Date().toISOString().slice(0, -1) + '000000Z';
    const newMessage = {
      id: 1,
      user_id: user?.id,
      receiver_id: receiver?.id,
      chat_id: chatId,
      message,
      read_at: null,
      created_at: formattedDate
    };
    setConversation((prevArray: any) => [...prevArray, newMessage]);
    await axiosInstance.post(`/chats/messages/send`, {
      receiver_id: receiver?.id,
      chat_id: chatId,
      message: message
    });
  };
  const handleKeyDown = async (event: any) => {
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
              <Input
                  onKeyDown={handleKeyDown}
                  value={searchQuery}
                  onChange={(e) =>setSearchQuery(e.target.value)}
                  // w={'85%'}
                  size='md'
                  my={'lg'}
                  radius='lg'
                  placeholder='Search chats...'
                />
                {filteredChats.length > 0 ? (
                  filteredChats.map((e: any, i) => (
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
                ): chatsLoading? 
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
                  </>:
                  <Group justify='center' align='center' p={'lg'} fw={'bold'}>Not Found</Group>
                
              }
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
                  <b>{receiver?.name} </b>
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
                      conversation.map((e: any, i) => (
                        <Paper
                          key={i}
                          shadow='xs'
                          radius={12}
                          p={10}
                          fw={'bold'}
                          my={'md'}
                          style={{
                            backgroundColor: e.user_id == user?.id ? '#00c4aa7d' : '#f8f8f8',
                            maxWidth: '300px',
                            marginLeft: e.user_id == user?.id ? '' : 'auto'
                          }}
                        >
                          <Text size='sm'>{e.message}</Text>
                          <Text size='xs' c='gray'>
                            {formatDate(e.created_at)}
                          </Text>
                          <Group c={e.read_at ? 'blue' : 'gray'}>
                            {e.user_id == user?.id ? (
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
export const messagesCandidateRoute = new Route({
  component: Messages,
  path: 'messages',
  getParentRoute: () => defaultLayoutRoute
});
