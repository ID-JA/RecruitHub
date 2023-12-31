<?php

namespace App\Models;

use App\Models\user;
use App\Models\Company;
use App\Models\Interview;
use App\Models\Application;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Job extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'user_id', 'employmentType', 'showSalary', 'salaryCurrency', 'salaryTime', 'category', 'salary', 'status', 'location', 'company_id', 'motivation', 'aboutCompany', 'howToApply', 'requirements'];

    protected $casts = [
        'requirements' => 'array',
        'category' => 'array'
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id');
    }
    public function recruiter()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'saved_jobs', 'job_id', 'user_id')->withTimestamps();
    }

    
}
