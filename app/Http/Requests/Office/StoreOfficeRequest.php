<?php

namespace App\Http\Requests\Office;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreOfficeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'office' => ['required', 'string', 'max:255'],
            'abbreviation' => ['required', 'string', 'max:255']
        ];
    }

    public function messages()
    {
        return [
            'office.unique' => 'This office is already created.'
        ];
    }
}
