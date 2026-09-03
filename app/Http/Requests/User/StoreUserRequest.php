<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        if ($this->isMethod('POST')) {
            return $this->create_rules();
        }

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            return $this->update_rules();
        }

        return [];
    }

    public function create_rules(): array
    {
        return [
            'username' => [
                'required',
                'string',
                'min:3',
                'max:255',
                'unique:users,username',
            ],

            'first_name' => [
                'required',
                'string',
                'max:255',
            ],

            'middle_name' => [
                'nullable',
                'string',
                'max:255',
            ],

            'last_name' => [
                'required',
                'string',
                'max:255',
            ],

            'office_id' => [
                'required',
                'integer',
                'exists:offices,id',
            ],

            'role' => [
                'required',
                'string',
                'in:admin,staff,user,driver',
            ],

            'status' => [
                'required',
                'string',
                'in:active,inactive',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
        ];
    }

    public function update_rules(): array
    {
        $user = $this->route('user');

        return [
            'username' => [
                'required',
                'string',
                'min:3',
                'max:255',
                Rule::unique('users', 'username')->ignore($user->id),
            ],

            'first_name' => [
                'required',
                'string',
                'max:255',
            ],

            'middle_name' => [
                'nullable',
                'string',
                'max:255',
            ],

            'last_name' => [
                'required',
                'string',
                'max:255',
            ],

            'office_id' => [
                'required',
                'integer',
                'exists:offices,id',
            ],

            'role' => [
                'required',
                'string',
                'in:admin,staff,user,driver',
            ],

            'status' => [
                'required',
                'string',
                'in:active,inactive',
            ],

            'password' => [
                'nullable',
                'string',
                'min:8',
                'confirmed',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'username.unique' => 'This username is already taken.',
        ];
    }
}