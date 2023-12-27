import { useEffect } from 'react';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

export const Home = () => {
  window.Pusher = Pusher;
  Echo.logToConsole = true;
  window.Echo = new Echo({
    broadcaster: '///',
    key: '///',
    cluster: '///',
    encrypted: '///'
  });
  useEffect(() => {
    const channel = window.Echo.channel('chat.1');
    channel.listen('.MessageSent', function (data: object) {
      console.log(JSON.stringify(data));
      ///
      //send get to /chats/chat_id to get all messages of that chat
      //send get reqeust to /chats to get all chats of user , and the latest message for each chat, and the count of unread message
      //send post request to /chats/messages/send to send message {user_id,receiver_id,chat_id(nullable),message}
      //send post to /chats/messages/mark-as-read to marke unread message to read , {receiver_id}
      //send delete to /chats/chat_id to delete a chat 
      //
      //
    });
    return () => {
      window.Echo.leave('chat.1');
    };
  }, []);
  return; ///
};
