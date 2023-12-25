<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\CodeCheckController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\NewPasswordController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ForgotPasswordController;
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

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::delete('/logout', [AuthController::class, 'logout']);
    
    Route::prefix('email')->group(function () {
        Route::get('/verify', [VerificationController::class, 'notice'])->name('verification.notice')->middleware('auth:sanctum')->withoutMiddleware("verified");
        Route::post('/verification-notification', [VerificationController::class, 'send'])->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send')->withoutMiddleware("verified");
        Route::get('/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify')->withoutMiddleware(['auth:sanctum', 'verified']);
    });
    Route::prefix('company')->group(function () {
        Route::get('/', [CompanyController::class, 'index']);
        Route::get('/read/{id}', [CompanyController::class, 'read']);
        Route::get('/showRecruiterCompanies', [CompanyController::class, 'showRecruiterCompanies']);
        Route::post('/create', [CompanyController::class, 'create']);
        Route::post('/update/{id}', [CompanyController::class, 'updateStatus']);
        Route::delete('/delete/{id}', [CompanyController::class, 'destory']);
    });
});




Route::post('password/email', [PasswordController::class, 'send']);
Route::post('password/reset', [PasswordController::class, 'reset']);