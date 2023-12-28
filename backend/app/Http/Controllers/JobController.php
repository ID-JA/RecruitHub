<?php

namespace App\Http\Controllers;

use App\Http\Requests\jobRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show');
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
            ->orderBy('created_at', 'asc') // Uncomment if needed
            ->get();
    
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
}
