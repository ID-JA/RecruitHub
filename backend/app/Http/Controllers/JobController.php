<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Requests\jobRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Job;

class JobController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show','searchJobs');
    }


    public function index()
    {
        $jobs = Job::all();
        return response()->json($jobs);
    }
    public function showRecruiterJobs(Request $request)
    {
        $user = Auth::user();
    
        $jobs = $user->jobs()
            ->when($request->filled('company'), function ($query) use ($request) {
                $query->where('company_id', $request->query('company'));
            })
            ->when($request->filled('status'), function ($query) use ($request) {
                $query->where('status', $request->query('status'));
            })
            ->when($request->filled('title'), function ($query) use ($request) {
                $query->where('title', 'like', '%' . $request->query('title') . '%');
            })
            ->when($request->filled('order_by'), function ($query) use ($request) {
                $query->orderBy($request->query('order_by'), $request->query('order') ?? 'asc');
            })
            ->paginate($request->query('per_page', 3)); // Default per page is 10, adjust as needed
    
        return response()->json($jobs);
    }

    public function store(jobRequest $request)
    {
        $data = $request->validated();
        $job = Job::create($data);
        return response()->json($job);
    }

    public function show(Job $job)
    {
        return response()->json($job);
    }

    public function update(jobRequest $request, Job $job)
    {

        $data = $request->validated();
        $job->updateOrFail($data);
        return response()->json($job);
    }
    

    public function destroy(Job $job)
    {
        $job->delete();
        return response()->json(true);
    }
    //search for jobs
    public function searchJobs(Request $request)
    {     
            $jobs_query =Job::with('recruiter','company');
            if($request->title || $request->location)
            $jobs_query->where('title','LIKE','%'.$request->title.'%');
            // if($request->location)
            // $jobs_query->where('location','LIKE','%'.$request->location.'%');
            $jobs=$jobs_query->get();
            
            return response()->json(['message' => 'Jobs are fetched successfully', 'data' => $jobs], 200);
     
       
    }

}
