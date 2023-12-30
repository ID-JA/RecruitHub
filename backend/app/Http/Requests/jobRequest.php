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
            'requirements' => ['bail', 'array'],
            'requirements.*' => ['bail', 'string'], // Each element in the array should be a string

            'company_id' => ['bail', 'required', Rule::exists(Company::class, 'id')],

            'title' => ['bail', 'required', 'string'],
            'location' => ['bail', 'required', 'string'],

            'employmentType' => ['bail', 'string'], // Assuming it's optional, adjust as needed
            'category' => ['bail', 'array'],
            'category.*' => ['bail', 'string'], // Each element in the array should be a string

            'description' => ['bail', 'required'],

            'salary' => ['bail', 'required', 'numeric'],
            'salaryCurrency' => ['bail', 'string'], // Assuming it's optional, adjust as needed
            'salaryTime' => ['bail', 'string'], // Assuming it's optional, adjust as needed

            'howToApply' => ['bail', 'string'], // Assuming it's optional, adjust as needed
            'motivation' => ['bail', 'string'], // Assuming it's optional, adjust as needed
            'aboutCompany' => ['bail', 'string'], // Assuming it's optional, adjust as needed

            'status' => ['bail', 'required', 'string'],
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
