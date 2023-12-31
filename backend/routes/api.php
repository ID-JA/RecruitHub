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
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\JobController;
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
            Route::post('/messages/mark-as-read/{id}', [MessageController::class, 'markMessageAsRead']);
        Route::delete('/{chat}', [ChatController::class, 'delete']);
            Route::get('/', [ChatController::class, 'index']);
            //delete not used in client
    });




    
    // --------note , make middleware for candidate&recruiter----------
    ///////candidate&recruiter and applications stuff
    Route::prefix('candidate')->group(function () {
        Route::get('/applied-jobs', [CandidateController::class, 'appliedJobs']);
        Route::get('/application/{applicationId}', [CandidateController::class, 'applicationDetails']);
        Route::post('/apply/{jobId}', [CandidateController::class, 'applyForJob']);
        Route::delete('/cancel-application/{applicationId}', [CandidateController::class, 'cancelApplication']);
    });
    Route::prefix('recruiter')->group(function () {
            Route::get('/received-applications/{jobId}', [RecruiterController::class, 'receivedApplications']);
        Route::get('/application/{applicationId}', [RecruiterController::class, 'applicationDetails']);
        Route::post('/update-application/{applicationId}', [RecruiterController::class, 'updateStatusApplication']);
        Route::get('/accepted-applications', [RecruiterController::class, 'acceptedApplications']);
        // Route::post('/reject-application/{applicationId}', [RecruiterController::class, 'rejectApplication']);
    });

    
///////////saved jobs
    Route::post('/save-job/{jobId}', [SavedJobController::class, 'saveJob']);
    Route::post('/unsave-job/{jobId}', [SavedJobController::class, 'unsaveJob']);
    Route::get('/saved-jobs', [SavedJobController::class, 'getSavedJobs']);

    
    Route::prefix('company')->group(function () {
        Route::get('/', [CompanyController::class, 'index']);
        Route::get('/read/{id}', [CompanyController::class, 'read']);
        Route::get('/showRecruiterCompanies', [CompanyController::class, 'showRecruiterCompanies']);
        Route::post('/create', [CompanyController::class, 'create']);
        Route::post('/update/{id}', [CompanyController::class, 'updateStatus']);
        Route::delete('/delete/{id}', [CompanyController::class, 'destory']);
    });

    Route::prefix('jobs')->group(function () {
        Route::get('/', [JobController::class, 'index'])->withoutMiddleware('auth:sanctum');
        Route::get('/{job}', [JobController::class, 'show'])->withoutMiddleware('auth:sanctum');
        Route::get('/recruiter', [JobController::class, 'showRecruiterJobs']);
        Route::post('/', [JobController::class, 'store']);
        Route::put('/{job}', [JobController::class, 'update']);
        Route::delete('/{job}', [JobController::class, 'destroy']);
        Route::get('/{jobId}/count-applicants', [JobController::class, 'getTotalApplicants']);
        Route::patch('/{job}/change-status', [JobController::class, 'updateJobStatus']);
    });

    Route::prefix('interviews')->group(function () {
        Route::post('/create', [InterviewController::class, 'create']);
        Route::get('/', [InterviewController::class, 'index']);
        Route::delete('/delete/{id}', [InterviewController::class, 'destroy']);
    });

    

    
});  

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::prefix('password')->group(function () {
    Route::post('/email', [PasswordController::class, 'send']);
    Route::post('/reset', [PasswordController::class, 'reset']);
});


Route::get('/jobs/search', [JobController::class, 'searchJobs']);

Route::get('/my-jobs', [JobController::class, 'showRecruiterJobs']);
Route::apiResources([
    'jobs' => JobController::class, 
 ]);

