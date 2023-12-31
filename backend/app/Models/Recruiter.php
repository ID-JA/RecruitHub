<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recruiter extends Model
{
    use HasFactory;

    protected $fillable = [
        'website',
        'experience',
        'industry',
        'about',
        'location',
        'zip',
        'user_id',
    ];


    protected $casts = [
        'experience' => 'json',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
