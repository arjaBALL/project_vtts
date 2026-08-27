<?php

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTicketRequest extends FormRequest
{
     public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
{
    $ticketId = $this->route('ticketRequest');

    return [
        'user_id' => ['required', 'integer', 'exists:users,id'],
        'trip_ticket_no' => [
            'required',
            'string',
            'max:50',
            Rule::unique('tickets', 'trip_ticket_no')->ignore($ticketId),
        ],
        'departure_date' => [
            'required', 'date'
        ],
        'return_date' => [
            'required', 'date'
        ],
        'destination' => [
            'required',
            'string',
            'max:255',
        ],
        'purpose' => [
            'required',
            'string',
            'max:255',
            ],
        'status' => [
            'required',
            'string',
            'in:active,inactive',
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