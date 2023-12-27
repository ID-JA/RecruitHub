<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    public function apply(Request $request, $jobId)
    {
        
        auth()->user()->applications()->attach($jobId);
        return response()->json(['message' => 'Application submitted successfully']);
    }

    public function cancelApplication(Request $request, $jobId)
    {
        Auth::user()->jobs()->detach($jobId);

        // Notify user (you can implement this)

        return response()->json(['message' => 'Application canceled successfully']);
    }

    public function checkStatus(Request $request, $jobId)
    {
        $application = Auth::user()->applications()->where('job_id', $jobId)->first();

        return response()->json(['application' => $application]);
    }

    public function acceptApplication(Request $request, $jobId)
    {
        $application = Auth::user()->applications()->where('job_id', $jobId)->firstOrFail();
        $application->update(['status' => 'accepted']);

        // Notify user (you can implement this)

        return response()->json(['message' => 'Application accepted successfully']);
    }

    public function rejectApplication(Request $request, $jobId)
    {
        $application = Auth::user()->applications()->where('job_id', $jobId)->firstOrFail();
        $application->update(['status' => 'rejected']);

        // Notify user (you can implement this)

        return response()->json(['message' => 'Application rejected successfully']);
    }
}
