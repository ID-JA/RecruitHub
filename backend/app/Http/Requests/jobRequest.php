<?php

namespace App\Http\Requests;

use App\Models\Company;
use App\Models\User;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class jobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;

    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['bail', 'required','string'],
            'description' => ['bail', 'required'],
            // 'requirements' => ['bail', 'required'],
            'salary' => ['bail', 'required','numeric'],
            'status' => ['bail', 'required','string'],
            // 'form' => ['bail','string'],
            'location' => ['bail', 'required','string'],
            // 'user_id' => ['bail', 'required', Rule::exists(User::class, 'id')],
            'company_id' => ['bail', 'required',Rule::exists(Company::class, 'id')],
        ];
    }
         /**
    * Handle a failed validation attempt.
    *
    * @param \Illuminate\Contracts\Validation\Validator $validator
    *
    * @throws \Illuminate\Http\Exceptions\HttpResponseException
    */
    protected function failedValidation(Validator $validator){
        throw new HttpResponseException(
            response()->json([
                "success" => false,
                "message" => __("skill.validation_error"),
                "data" => $validator->errors(),
            ]),
            422
        );
    }
    
}
