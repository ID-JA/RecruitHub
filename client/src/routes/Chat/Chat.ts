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
    });
    return () => {
      window.Echo.leave('chat.1');
    };
  }, []);
  return; ///
};
