<?php

namespace App\Models;

use App\Models\Job;
use App\Models\Company;
use App\Models\Interview;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable; use SoftDeletes;


    public function companies()
    {
        return $this->belongsToMany(Company::class);
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];


    protected $dates = ['deleted_at'];

    /**
     * The methods of the user model
     */

    public function profile()
    {
        if ($this->role === 'candidate') {
            return $this->hasOne(Candidate::class);
        } elseif ($this->role === 'recruiter') {
            return $this->hasOne(Recruiter::class);
        }
        return null;
    }
    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

    public function chats()
    {
        return $this->belongsToMany(Chat::class);
    }

    /**
     * Get the messages sent by the user.
     */
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'user_id');
    }

    /**
     * Get the messages received by the user.
     */
    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    /**
     * 
     */
    public function applications()
    {
        return $this->hasMany(Application::class, 'applicant_id');
    }

    public function savedJobs()
    {
        return $this->belongsToMany(Job::class, 'saved_jobs', 'user_id', 'job_id')->withTimestamps();
    }

    public function meetings()
    {
        return $this->hasMany(Interview::class);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

}
