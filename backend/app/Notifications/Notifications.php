<?php

namespace App\Notifications;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;

class Notifications extends Notification
{
    use Queueable;


     private $data;
        private $url;
     public function __construct($data)
     {
         $this->data = $data;
         if(isset($data['url'])){
            $this->url=$data['url'];
         }else{
            $this->url='/zoome';
         }
     }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database','broadcast','mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
                    ->line('You have received new notifications !✨')
                    ->action('Check it out', url(isset($this->data['url']) ? $this->data['url'] : env('FRONTEND_URL')))
                    // ->action('Check it out', url(env('FRONTEND_URL')))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => $this->data['title'],
            'body' => $this->data['body'],
        ];
    }



    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage(($this->toArray($notifiable)));
    }

  
  
    public function broadcastAs()
    {
        return 'Notifications';
    }
    
    public function broadcastOn(): Channel
    {
        return new Channel("App.Models.User.".$this->data['id']);
    }

}
