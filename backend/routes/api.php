<?php

use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\Notifications;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\SavedJobController;
use Illuminate\Support\Facades\Notification;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\CodeCheckController;
use App\Http\Controllers\RecruiterController;
use App\Http\Controllers\NewPasswordController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\ForgotPasswordController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
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



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::delete('/logout', [AuthController::class, 'logout']);

    Route::prefix('notifications')->group(function () {
        Route::post('/read/{notificationId}',[NotificationController::class,'read']);
        Route::get('/',[NotificationController::class,'index']);
        Route::delete('/destroy',[NotificationController::class,'delete']);
        Route::post('/read-all',[NotificationController::class,'readAll']);
    });
    
    Route::prefix('email')->group(function () {
        Route::get('/verify', [VerificationController::class, 'notice'])->name('verification.notice')->middleware('auth:sanctum')->withoutMiddleware("verified");
        Route::post('/verification-notification', [VerificationController::class, 'send'])->middleware(['auth:sanctum', 'throttle:6,1'])->name('verification.send')->withoutMiddleware("verified");
        Route::get('/verify/{id}/{hash}', [VerificationController::class, 'verify'])->name('verification.verify')->withoutMiddleware(['auth:sanctum', 'verified']);
    });

    Route::prefix('chats')->group(function () {
        Route::get('/{chat}', [ChatController::class, 'show']);
        Route::post('/messages/send', [MessageController::class, 'send']);
        Route::get('/messages/mark-as-read', [MessageController::class, 'markMessageAsRead']);
        Route::delete('/{chat}', [ChatController::class, 'delete']);
        Route::get('/', [ChatController::class, 'index']);
    });

    
    // --------note , make middleware for candid&recruir----------
    ///////candidate and applications stuff
    Route::get('/candidate/applied-jobs', [CandidateController::class, 'appliedJobs']);
    Route::get('/candidate/application/{applicationId}', [CandidateController::class, 'applicationDetails']);
    Route::post('/candidate/apply/{jobId}', [CandidateController::class, 'applyForJob']);
    Route::delete('/candidate/cancel-application/{applicationId}', [CandidateController::class, 'cancelApplication']);
    // --------note , make middleware for candid&recruir----------
    ///////recruiter and applications stuff
    Route::get('/recruiter/received-applications/{jobId}', [RecruiterController::class, 'receivedApplications']);
    Route::get('/recruiter/application/{applicationId}', [RecruiterController::class, 'applicationDetails']);
    Route::post('/recruiter/accept-application/{applicationId}', [RecruiterController::class, 'acceptApplication']);
    Route::post('/recruiter/reject-application/{applicationId}', [RecruiterController::class, 'rejectApplication']);
///////////saved jobs
    Route::post('/save-job/{jobId}', [SavedJobController::class, 'saveJob']);
    Route::post('/unsave-job/{jobId}', [SavedJobController::class, 'unsaveJob']);
    
    Route::prefix('company')->group(function () {
        Route::get('/', [CompanyController::class, 'index']);
        Route::get('/read/{id}', [CompanyController::class, 'read']);
        Route::get('/showRecruiterCompanies', [CompanyController::class, 'showRecruiterCompanies']);
        Route::post('/create', [CompanyController::class, 'create']);
        Route::post('/update/{id}', [CompanyController::class, 'updateStatus']);
        Route::delete('/delete/{id}', [CompanyController::class, 'destory']);
    });
});  

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::prefix('password')->group(function () {
    Route::post('/email', [PasswordController::class, 'send']);
    Route::post('/reset', [PasswordController::class, 'reset']);
});
