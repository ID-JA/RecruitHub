<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\jobRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\Job;
use Illuminate\Support\Facades\DB;

class JobController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('index', 'show', 'searchJobs');
    }


    public function index(Request $request)
    {
        $query = DB::table('jobs')
            ->join('companies', 'jobs.company_id', '=', 'companies.id')
            ->where('jobs.status', '=', 'active')
            ->select('jobs.*', 'companies.title as company_name');

        if ($request->has('location')) {
            $query->where('jobs.location', 'like', '%' . $request->input('location') . '%');
        }

        if ($request->has('title')) {
            $title = $request->input('title');
            $query->where(function ($query) use ($title) {
                $query->where('jobs.title', 'like', '%' . $title . '%')
                    ->orWhere('jobs.description', 'like', '%' . $title . '%')
                    ->orWhereJsonContains('jobs.requirements', $title);
            });
        }

        $jobs = $query->get();

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

    public function store(JobRequest $request)
    {
        $data = $request->validated();
        $user = auth()->user();

        $job = new Job($data);

        $user->jobs()->save($job);

        return response()->json(['message' => 'Job has been created successfully', 'job' => $job]);
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
        $jobs_query = Job::with('recruiter', 'company');
        if ($request->title || $request->location)
            $jobs_query->where('title', 'LIKE', '%' . $request->title . '%');
        // if($request->location)
        // $jobs_query->where('location','LIKE','%'.$request->location.'%');
        $jobs = $jobs_query->get();

        return response()->json(['message' => 'Jobs are fetched successfully', 'data' => $jobs], 200);
    }

    public function getTotalApplicants(Request $request, $jobId)
    {
        $user = auth()->user();
        $job = $user->jobs()->find($jobId);

        if (!$job) {
            return response()->json(['message' => 'Job not found'], 404);
        }

        $totalApplicants = $job->applications()->count();

        return response()->json(['total_applicants' => $totalApplicants]);
    }

    public function updateJobStatus(Request $request, $jobId)
    {
        $user = Auth::user();

        $job = $user->jobs()->find($jobId);

        if (!$job) {
            return response()->json(['message' => 'Job not found or you do not have permission to update this job'], 404);
        }

        $validatedData = $request->validate([
            'status' => 'required|in:active,pending,closed,draft,archive',
        ]);

        $job->status = $validatedData['status'];
        $job->save();

        return response()->json(['message' => 'Job status updated successfully']);
    }
}
