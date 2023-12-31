<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(){
        $allNotifications = auth()->user()->notifications;
        $unreadNotificationsCount = auth()->user()->unreadNotifications->count();

        return response()->json([
            'notifications'=>$allNotifications,
            'unreadNotificationsCount'=>$unreadNotificationsCount
        ]);
    }

    public function delete(){
        auth()->user()->notifications()->delete();
        return response()->json(['success'=>'Notifications is deleted successfully!']);
    }
    public function read($notificationId){
        $notification = auth()->user()->notifications->find($notificationId);
        $notification->markAsRead();
        return response()->json(['success'=>'Notification is sat to read']);
    }
    public function readAll(){
        auth()->user()->unreadNotifications->markAsRead();
        return response()->json(['success'=>'Notificationa is sat to read']);
    }
    

}
