<?php

namespace App\Models;

use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Application extends Model
{
    use HasFactory;

    protected $fillable = ['job_id', 'applicant_id', 'cover_letter', 'resume', 'status'];


    public function candidate()
    {
        return $this->belongsTo(User::class, 'applicant_id');
    }

    public function job()
    {
        return $this->belongsTo(Job::class,'applicant_id');
    }
    

}
