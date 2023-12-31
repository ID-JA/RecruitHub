<?php

namespace App\Models;

use App\Models\User;
use App\Models\Message;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = ['participants']; 
    protected $casts = [
        'participants' => 'json',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)->where('users.id', '!=', auth()->user()->id);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function latestMessage()
    {
        return $this->hasOne(Message::class)->latest();
    }

    public function unreadMessagesCount(){
        return $this->hasMany(Message::class)->where('receiver_id',auth()->user()->id)
        ->whereNull('read_at');
    }

    
}
