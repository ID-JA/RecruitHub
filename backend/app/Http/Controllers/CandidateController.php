<?php

namespace App\Http\Controllers;
use App\Models\Job;
use App\Models\Candidate;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CandidateController extends Controller
{
    public function appliedJobs()
    {
        $applications = Auth::user()->applications;
        return response()->json([
            'applications'=>$applications,
        ]);
    }

    public function applicationDetails($applicationId)
    {
        $application = Application::findOrFail($applicationId);
        return response()->json([
            "application"=>$application,
        ]);
    }

    public function applyForJob(Request $request, $jobId)
    {
        $request->validate([
            'resume' => 'required|mimes:pdf,doc,docx', 
        ]);
    
        $resumePath = $request->file('resume')->store('resumes', 'public');
        Auth::user()->applications()->create([
            'job_id' => $jobId,
            'cover_letter' => $request->input('cover_letter'),
            'resume' => $resumePath,
            'status'=>'pending'
        ]);
dd(Job::find($jobId));
        // $user=auth()->user();
    // $data=[
    //     'id'=>$user->id,
    //     'title'=>'hello world title',
    //     'body'=>'body'
    // ];
    // $user->notify(new Notifications($data));
        //don't forget to notify user type recritrue here!!!! important

        return response()->json([
            'success'=>'Application was added successfully',
        ]);
    }

    public function cancelApplication(Request $request, $applicationId)
    {
        $application = Auth::user()->applications()->findOrFail($applicationId);
        $application->delete();

        // Notify user !! important

        return response()->json([
            'success'=>"Application was deleted successfully",
        ]);
    }
}
