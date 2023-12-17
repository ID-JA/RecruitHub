<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Candidate;
use App\Models\Recruiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{


    public function register(Request $request)
    {
        
        $validatedUser = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role'=>'required|in:candidate,recruiter'
        ]);
        $validatedRecruiter = $request->validate([
            'experience'=>'nullable',
        ]);
        $validatedCandidate = $request->validate([
            'resume_path'=>'nullable'
        ]);

        $validatedUser['password']=Hash::make($validatedUser['password']);
        $user = User::create($validatedUser);
        if ($validatedUser['role'] === 'candidate') {
            $user->profile()->create($validatedCandidate);
        } elseif ($validatedUser['role'] === 'recruiter') {
            $user->profile()->create($validatedRecruiter);
        }
        
        // $user->createToken('authToken')->plainTextToken;
        Auth::login($user);
        event(new Registered($user));
        return response()->json(['message' => 'Verification email sent. Please check your email.'], 201);
    }
    
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $token = Auth::user()->createToken('authToken')->plainTextToken;
            return response()->json(['token' => $token], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function logout(Request $request)
    {
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function user(Request $request) {
        $request->user()->profile;
        return $request->user();
    }
}