<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Application;
use App\Models\user;
use App\Models\Company;
class Job extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'user_id', "employmentType", "showSalary", "salaryCurrency","salaryTime","category", 'salary', 'status', 'location', 'company_id',"motivation","aboutCompany","howToApply"];

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
        return $this->hasMany(Application::class,'applicant_id');
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'saved_jobs', 'job_id', 'user_id')->withTimestamps();
    }
}
