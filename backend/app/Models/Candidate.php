<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Candidate extends Authenticatable
{
    use HasFactory;

    protected $fillable = [

        'skills',
        'bio',
        'experience',
        'education',
        'resume',
        'title',
        'city',
        'country',
        'social',
        'user_id',
    ];

    protected $casts = [
        'skills' => 'json',
        'experience' => 'json',
        'social' => 'json',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
