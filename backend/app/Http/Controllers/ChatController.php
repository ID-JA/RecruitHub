<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function index(){
        $chats=auth()->user()->chats;
        $chats->load('latestMessage');
        $chats->each(function ($chat) {
            $chat->unreadMessagesCount = $chat->unreadMessagesCount()->count();
        });
        return response()->json([
            'chats'=>$chats
        ]);
    }
    public function show(Chat $chat)
    {
        $messages = Message::where('chat_id', $chat->id)->paginate(10);
        return response()->json(['messages' => $messages]);
    }

    public function delete(Chat $chat)
    {
        $chat->users()->detach();
        $chat->delete();
        return response()->json(['status' => 'Chat deleted successfully']);
    }
}
