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

    public function updateStatusApplication(Request $request, $applicationId)
    {
        $status=$request->input('status');
        $application = Application::findOrFail($applicationId);
        $job=$application->job;
        $candidate=$application->candidate;
        $data=[
            'id'=>$candidate->id,
            'title'=>'congratulations 🎉',
        ];
        if($status=='accepted'){
            $application->update(['status' => $status]);
            $data['body']="Your application for offer '$job->title' was accepted!😁";
        }else if($status=='pending'){
            $application->update(['status' => $status]);
            $data['body']="Your application for offer '$job->title' still pending!";
        }else if($status=='rejected'){
            $application->update(['status' => $status]);
            $data['body']="Your application for offer '$job->title' was rejected 😐!";
        }
        // $candidate->notify(new Notifications($data));

        return response()->json([
            'success'=>"applications was updated successfully",
            'application'=>$application
        ]);
    }

    // public function rejectApplication(Request $request, $applicationId)
    // {
    //     $application = Application::findOrFail($applicationId);
    //     $application->update(['status' => 'rejected']);

    //     $job=$application->job;
    //     $candidate=$application->candidate;
    //     $data=[
    //         'id'=>$candidate->id,
    //         'title'=>'Update!',
    //         'body'=>"Your application for offer '$job->title' was rejected 😐!"
    //     ];
    //     $candidate->notify(new Notifications($data));

    //     return response()->json([
    //         'success'=>"applications was rejected successfully",
    //         'application'=>$application
    //     ]);
    // }
}
