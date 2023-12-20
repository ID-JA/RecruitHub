<?php

namespace App\Http\Requests;

use App\Models\Company;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
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
            'requirements' => ['bail', 'required'],
            'salary' => ['bail', 'required','numeric'],
            'status' => ['bail', 'required','boolean'],
            'form' => ['bail', 'required','string'],
            'location' => ['bail', 'required','string'],
            'user_id' => ['bail', 'required', Rule::exists(User::class, 'id')],
            'company_id' => ['bail', 'required',Rule::exists(Company::class, 'id')],
        ];
    }
}
