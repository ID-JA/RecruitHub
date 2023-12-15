<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/login',  [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::delete('/logout', [AuthController::class, 'logout']);

    // Route::get('/email/verify', 'VerificationController@show')->name('verification.notice');
    // Route::get('/email/verify/{id}/{hash}', 'VerificationController@verify')->name('verification.verify')->middleware(['signed']);
    // Route::post('/email/resend', 'VerificationController@resend')->name('verification.resend');


    Route::get('/email/verify', function () {
        dd('first');
        return view('auth.verify-email');
    })->middleware('auth')->name('verification.notice');
     
    
    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        // dd('second');
        $request->fulfill();
     
        return view('auth.verify-email');
    })->middleware('signed')->name('verification.verify');
    
     
    Route::post('/email/verification-notification', function (Request $request) {
        dd('third');
        $request->user()->sendEmailVerificationNotification();
     
        return back()->with('message', 'Verification link sent!');
    })->middleware('throttle:6,1')->name('verification.send');
});