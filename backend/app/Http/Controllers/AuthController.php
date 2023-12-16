<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        //validation

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);
        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),

        ]);
        $user->save();
        // Create a candidate associated with the user
        $candidate = Candidate::create([
            'user_id' => $user->id,
            // Add other candidate-specific data
        ]);

        $token = $user->createToken('AuthToken')->accessToken;

        return response(['token' => $token, 'user' => $user], 201);
    }

    public function login(Request $request)
    {

        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);
        if (Auth::Attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('AuthToken')->plainTextToken;

            return response(['token' => $token, 'user' => $user], 201);

        } else {
            return response(['message' => 'invalid credentails'], 401);
        }

    }

    public function logout(Request $request)
    {
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
