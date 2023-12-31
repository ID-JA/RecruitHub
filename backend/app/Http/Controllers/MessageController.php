<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function send(Request $request)
    {
        
        // $chat = Chat::find($request->chat_id);
        $participantIds=[auth()->user()->id,$request->receiver_id];
        $chat = Chat::where(function ($query) use ($participantIds) {
            foreach ($participantIds as $participantId) {
                $query->whereJsonContains('participants', $participantId);
            }
        })->first();

        if (!$chat) {
            $chat = Chat::create([
                'participants' => [$request->receiver_id, auth()->user()->id]
            ]);
            $chat->users()->attach([auth()->user()->id, $request->receiver_id]);
        }
        $message = Message::create([
            'user_id' => auth()->user()->id,
            'receiver_id' => $request->receiver_id,
            'chat_id' => $chat->id,
            'message' => $request->message
        ]);

        broadcast(new MessageSent($message));

        return response()->json([
            'status' => 'Message sent successfully',
        ]);
    }

    public function markMessageAsRead(Request $request,$id)
    {
        Message::where('user_id',$id)
        ->where('receiver_id',  auth()->user()->id)
        ->whereNull('read_at')    
        ->update(['read_at' => now()]);

        return response()->json(['status' => 'All messages marked as read']);
    }



}
