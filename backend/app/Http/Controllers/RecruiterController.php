<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Recruiter;
use App\Models\Application;
use Illuminate\Http\Request;
use App\Notifications\Notifications;
use Illuminate\Support\Facades\Auth;

class RecruiterController extends Controller
{
    public function receivedApplications($jobId)
    {
        $job = Auth::user()->jobs()->findOrFail($jobId);
        $job->applications;
        foreach($job->applications as $application){
            $application->candidate->profile;
        }
        return response()->json([
            "applications"=>$job,
        ]);
    }

    public function applicationDetails($applicationId)
    {
        $application = Application::find($applicationId);
        if($application){
            return response()->json([
                "applications"=>$application,
            ]);
        }else{
            return response()->json([
                'error'=>"Application is not found",
            ],404);
        }
        
    }

    public function acceptApplication(Request $request, $applicationId)
    {
        $application = Application::findOrFail($applicationId);
        $application->update(['status' => $request->input('status')]);
        $job=$application->job;
        $candidate=$application->candidate;
        $data=[
            'id'=>$candidate->id,
            'title'=>'congratulations 🎉',
            'body'=>"Your application for offer '$job->title' was accepted!😁"
        ];
        $candidate->notify(new Notifications($data));

        return response()->json([
            'success'=>"applications was accepted successfully",
            'application'=>$application
        ]);
    }

    public function rejectApplication(Request $request, $applicationId)
    {
        $application = Application::findOrFail($applicationId);
        $application->update(['status' => 'rejected']);

        $job=$application->job;
        $candidate=$application->candidate;
        $data=[
            'id'=>$candidate->id,
            'title'=>'Update!',
            'body'=>"Your application for offer '$job->title' was rejected 😐!"
        ];
        $candidate->notify(new Notifications($data));

        return response()->json([
            'success'=>"applications was rejected successfully",
            'application'=>$application
        ]);
    }
}
