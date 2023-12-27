<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class Company extends Model
{
    use HasFactory;


    protected $table='companies';

    protected $fillable = [
        'title',
        'location',
        'description',
        'founded_at',
        'type',
        'website',
        'contact_email',
        'contact_phone',
        'logo',
        'revenue',
        'facebook',
        'instagram',
        'linkedin',
        'status', // Added status field
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }
}
