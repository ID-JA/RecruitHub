<?php

namespace App\Http\Controllers;

use App\Http\Requests\jobRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Job;

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

    public function showRecruiterJobs()
    {
        $user = Auth::user();
        $jobs = $user->jobs;
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
