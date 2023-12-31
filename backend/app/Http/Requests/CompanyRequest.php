<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\Rule;

class CompanyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['bail', 'required', 'string'],
            'location' => ['bail', 'required', 'string'],
            'description' => ['bail', 'nullable', 'string'],
            'founded_at' => ['bail', 'nullable', 'numeric'],
            'type' => ['bail', 'nullable', 'string'],
            'website' => ['bail', 'nullable', 'url'],
            'contact_email' => ['bail', 'nullable', 'email'],
            'contact_phone' => ['bail', 'nullable', 'string'],
            'logo' => ['bail', 'nullable', 'string'],
            'revenue' => ['bail', 'nullable', 'numeric'],
            'facebook' => ['bail', 'nullable', 'url'],
            'instagram' => ['bail', 'nullable', 'url'],
            'linkedin' => ['bail', 'nullable', 'url'],
            'status' => ['bail', 'nullable', Rule::in(['open', 'closed'])],
        ];
    }

    protected function failedValidation(Validator $validator){
        throw new HttpResponseException(
                response()->json([
                    "success" => false,
                    "message" => __("skill.validation_error"),
                    "data" => $validator->errors(),
                    ]),
                422);
    }
}
