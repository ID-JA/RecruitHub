<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Job extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'requirements', 'user_id', 'location', 'salary', 'form'];

    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_id');
    }

    public function applicants()
    {
        return $this->belongsToMany(User::class, 'applications')
        ->withPivot('status');
    }

}
