<?php

namespace App\Http\Requests\Driver;

use Illuminate\Foundation\Http\FormRequest;

class StoreDriverRequest extends FormRequest
{
     public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => ['required', 'integer', 'exists:user,id'],
            'license_number' => ['required', 'string', 'max:50'],
            'license_expiry' => ['required', 'date'],
        ];
    }

    public function messages(): array 
    {
        return [
            'license_number.unique' => 'This license number is already in use.'
        ];
    }
}