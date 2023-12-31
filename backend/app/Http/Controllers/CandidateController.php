<?php

namespace App\Http\Controllers;
use App\Models\Job;
use App\Models\Candidate;
use App\Models\Application;
use Illuminate\Http\Request;
use App\Notifications\Notifications;
use Illuminate\Support\Facades\Auth;

class CandidateController extends Controller
{
    public function appliedJobs()
    {
        $joinedDetails = Application::join('jobs', 'applications.job_id', '=', 'jobs.id')
        ->where('applications.applicant_id', '=', Auth::user()->id)
        ->select('applications.*', 'jobs.id as job_id', 'jobs.title as job_title')
        ->get();
    
        
    
        return response()->json([
            'applications' => $joinedDetails,
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
        $user=Auth::user();
        $job=Job::find($jobId);
        $resumePath = $request->file('resume')->store('resumes', 'public');
        $user->applications()->create([
            'job_id' => $jobId,
            'cover_letter' => $request->input('cover_letter'),
            'resume' => $resumePath,
            'status'=>'pending'
        ]);
        $recruiter=$job->recruiter;
        $data=[
            'id'=>$recruiter->id,
            'title'=>'Someone just applied for your offer ✨',
            'body'=>"$user->name has applied for your offer '$job->title' 😎"
        ];
        $recruiter->notify(new Notifications($data));

        return response()->json([
            'success'=>'Application was added successfully',
        ]);
    }

    public function cancelApplication(Request $request, $applicationId)
    {
        $user = Auth::user();
        $application = $user->applications()->find($applicationId);
    
        if (!$application) {
            return response()->json([
                'error' => "Application with ID $applicationId not found",
            ], 404);
        }
            $resumePath = $application->resume;

        if (file_exists(public_path('storage/' . $resumePath))) {
            unlink(public_path('storage/' . $resumePath));
        }
        $application->delete();
        $job=$application->job;
        $recruiter=$application->job->recruiter;
        $data=[
            'id'=>$recruiter->id,
            'title'=>'Someone just cancelled for your offer',
            'body'=>"$user->name has cancelled his application for your offer '$job->title' 😐"
        ];
        $recruiter->notify(new Notifications($data));

        return response()->json([
            'success'=>"Application was deleted successfully",
        ]);
    }
}
