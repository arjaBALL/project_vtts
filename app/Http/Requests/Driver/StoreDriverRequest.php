<?php

namespace App\Http\Requests\Driver;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDriverRequest extends FormRequest
{
     public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
{
    $driverId = $this->route('driver');

    return [
        'user_id' => ['required', 'integer', 'exists:users,id'],
        'license_number' => [
            'required',
            'string',
            'max:50',
            Rule::unique('drivers', 'license_number')->ignore($driverId),
        ],
        'license_expiry' => [
            'required', 'date'
        ],
    ];
}
    public function messages(): array 
    {
        return [
            'license_number.unique' => 'This license number is already in use.'
        ];
    }
}