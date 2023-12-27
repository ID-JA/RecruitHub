<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SavedJobController extends Controller
{
    public function saveJob($jobId)
    {
        $user = Auth::user(); 
        $job = Job::find($jobId);
        if (!$user->savedJobs->contains($job)) {
            $user->savedJobs()->attach($job);
        }

        return response()->json(['message' => 'Job saved successfully']);
    }

    public function unsaveJob($jobId)
    {
        $user = Auth::user();
        $job = Job::find($jobId);

        if ($user->savedJobs->contains($job)) {
            $user->savedJobs()->detach($job);
        }

        return response()->json(['message' => 'Job unsaved successfully']);
    }

    public function getSavedJobs()
    {
        $user = Auth::user(); 
        $savedJobs = $user->savedJobs;

        return response()->json(['saved_jobs' => $savedJobs]);
    }
}
