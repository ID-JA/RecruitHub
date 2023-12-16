<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'employer_id', 'requirements', 'salary', 'status', 'form', 'location', 'company_id'];

    // public function employer()
    // {
    //     return $this->belongsTo(User::class, 'employer_id');
    // }
    // public function company()
    // {
    //     return $this->belongsTo(Company::class);

    // }
}
