<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Interview;
use App\Models\Application;
use Illuminate\Http\Request;
use MacsiDigital\Zoom\Facades\Zoom;
use App\Notifications\Notifications;

class InterviewController extends Controller
{
    public function index(){
        $interviews = auth()->user()->jobs;

        $interviews = $interviews->each(function ($interview) {
            $interview->applications = $interview->applications()
                ->whereHas('meeting', function ($query) {
                    $query->whereNotNull('meeting_id');
                })
                ->with('meeting', 'candidate')
                ->get();
        });
  
        return response()->json([
            'interviews'=>$interviews
        ]);
    }
    public function createRoom($request){

        $user = Zoom::user()->first();
        $meetingData = [
            'topic' => $request->topic,
            'duration' => $request->duration,
            'password' => $request->password,
            'start_time' => $request->start_at, 
            'timezone' => config('zoom.timezone')
        ];
        $meeting = Zoom::meeting()->make($meetingData);

        $meeting->settings()->make([
            'join_before_host' => false,
            'host_video' => false,
            'participant_video' => false,
            'mute_upon_entry' => true,
            'waiting_room' => true,
            'approval_type' => config('zoom.approval_type'),
            'audio' => config('zoom.audio'),
            'auto_recording' => config('zoom.auto_recording')
        ]);

        return  $user->meetings()->save($meeting);

    }
    public function create(Request $request){
        $meeting=$this->createRoom($request);
        $interview =Interview::create([
            'user_id' => auth()->user()->id,
            'application_id' =>$request->application_id,
            'meeting_id'=>$meeting->id,
            'topic' => $meeting->topic,
            'start_at' => $meeting->start_time,
            'duration' => $meeting->duration,
            'password' => $meeting->password,
            'start_url' => $meeting->start_url,
            'join_url' => $meeting->join_url,
        ]);
        $candidate=Application::find($request->application_id)->candidate;
        if($candidate){
            $data=[
                'id'=>$candidate->id,
                'title'=>'Interview up coming 🎉',
                'body'=>"You are going to pass an interview at $interview->start_at, check your email for the LINK!😁",
                'url'=>$interview->join_url
            ];
   
            $candidate->notify(new Notifications($data));
        }
       
        return response()->json([
            'success'=>"You have created an interview successfully!",
            "room"=>$interview
        ]);
    }

    public function destroy($id)
    {
        try {
            $meeting = Zoom::meeting()->find($id);
            $meeting->delete();
            $interview=Interview::where('meeting_id', $id)->first();

            $candidate=$interview->application->candidate;
           
            
            $interview->delete();

            if($candidate){
                $data=[
                    'id'=>$candidate->id,
                    'title'=>'unfortunately 😶',
                    'body'=>"Your interview was cancled!, don't be sad"
                ];
                $candidate->notify(new Notifications($data));
            }

            return response()->json([
                'success'=>"you have deleted interview successfully!",
                'h'=>$candidate
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }

    }
}
