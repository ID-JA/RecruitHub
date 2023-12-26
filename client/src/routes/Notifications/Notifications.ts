import { useEffect } from 'react';
import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

export const Notifications = () => {
  window.Pusher = Pusher;
  Echo.logToConsole = true;
  window.Echo = new Echo({
    broadcaster: '///',
    key: '///',
    cluster: '///',
    encrypted: '///'
  });
  useEffect(() => {
    const channel = window.Echo.channel('App.Models.User.1');
    channel.listen('.Notifications', function (data: object) {
      console.log(JSON.stringify(data));
      //formdata of notifications that you will recieve is {id,title,body} make state for it.
      //App.Models.User.1 !! don't forget to replace the number 1
      //with the actual user id (the current user id)
      //don't change anything else .
      //copy this code and put it in the compocnent where notification lives

      // when you click on notification you will post reqeust to (/notifications/read/Notification_id) to set it to read
      // if read_at is null make the notification look bold
      // send get reqeust to /notifications to get all notification and the count of unread ones
      //send post to /notifications/read-all to clear all notifications and make them read
      //send delete to /notifications/destroy to delete all notifications
    });
    return () => {
      window.Echo.leave('App.Models.User.1');
    };
  }, []);

  return; ///;
};
