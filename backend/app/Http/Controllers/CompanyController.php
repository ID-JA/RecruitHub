<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyRequest;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class CompanyController extends Controller
{
    public function index()
    {
        $companies = Company::all();
        return response()->json($companies);
    }

    public function showRecruiterCompanies()
    {
        $user = Auth::user();

        if ($user->role !== 'recruiter') {
            return response()->json(['error' => 'Only recruiters can create companies'], 403);
        }
        $companies = $user->companies;
        return response()->json($companies);
        
    }


    public function create(CompanyRequest $request)
    {
        $validatedData = $request->validated();
        $user = auth()->user();
    
        if ($user->role !== 'recruiter') {
            return response()->json(['error' => 'Only recruiters can create companies'], 403);
        }

        $company = Company::create($validatedData);
        $user->companies()->attach([$company->id]);

        return response()->json(['message' => 'Company created successfully', 'company' => $company]);
    }

    public function updateStatus(Request $request, $id)
    {
        $user = auth()->user();

        if ($user->role !== 'recruiter') {
            return response()->json(['error' => 'Only recruiters can update company status'], 403);
        }

        $request->validate([
            'status' => 'required|in:open,closed',
        ]);

        $company = Company::findOrFail($id);
        $company->update(['status' => $request->status]);

        return response()->json(['message' => 'Company status updated successfully', 'company' => $company]);
    }

    public function destory(Company $id)
    {
        $id->users()->detach();
        $id->delete();
        return response()->json(['message' => 'Company deleted successfully']);
    }

    public function read($id)
    {
        $company = Company::findOrFail($id);

        return response()->json(['company' => $company]);
    }
}
