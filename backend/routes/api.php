<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerificationController;
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


Route::post('/login', [AuthController::class, 'login'])->middleware('verified');
Route::post('/register', [AuthController::class, 'register']);

Route::get('/login',  [AuthController::class, 'login'])->name('login');

Route::middleware(['auth:sanctum','verified'])->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::delete('/logout', [AuthController::class, 'logout']);
    
    Route::prefix('email')->group(function () {
        Route::get('/verify', [VerificationController::class, 'notice'])->name('verification.notice')->middleware('auth:sanctum')->withoutMiddleware("verified");
        Route::post('/verification-notification', [VerificationController::class, 'send'])->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send')->withoutMiddleware("verified");
        Route::get('/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify')->withoutMiddleware(['auth:sanctum', 'verified']);
    });
});

