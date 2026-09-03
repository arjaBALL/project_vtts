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
        if ($this->isMethod('POST')) {
            return $this->createRules();
        }

        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            return $this->updateRules();
        }

        return [];
    }

    /**
     * Validation rules for creating a trip ticket.
     */
    public function createRules(): array
    {
        return [
            'departure_date' => [
                'required',
                'date',
            ],

            'return_date' => [
                'required',
                'date',
                'after_or_equal:departure_date',
            ],

            'destination' => [
                'required',
                'string',
                'max:255',
            ],

            'passengers' => [
                'required',
                'integer',
                'min:1',
            ],

            'purpose' => [
                'required',
                'string',
                'max:255',
            ],
        ];
    }

    /**
     * Validation rules for updating a trip ticket.
     */
    public function updateRules(): array
    {
        $ticket = $this->route('tripticket');

        return [
            'departure_date' => [
                'required',
                'date',
            ],

            'return_date' => [
                'required',
                'date',
                'after_or_equal:departure_date',
            ],

            'destination' => [
                'required',
                'string',
                'max:255',
            ],

            'passengers' => [
                'required',
                'integer',
                'min:1',
            ],

            'purpose' => [
                'required',
                'string',
                'max:255',
            ],

            'status' => [
                'required',
                'string',
                Rule::in([
                    'pending',
                    'approved',
                    'rejected',
                ]),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'departure_date.required' =>
                'Departure date is required.',

            'return_date.required' =>
                'Return date is required.',

            'return_date.after_or_equal' =>
                'Return date must be on or after the departure date.',

            'destination.required' =>
                'Destination is required.',

            'destination.max' =>
                'Destination may not be greater than 255 characters.',

            'passengers.required' =>
                'Number of passengers is required.',

            'passengers.integer' =>
                'Number of passengers must be a whole number.',

            'passengers.min' =>
                'There must be at least 1 passenger.',

            'purpose.required' =>
                'Purpose is required.',

            'purpose.max' =>
                'Purpose may not be greater than 255 characters.',

            'status.required' =>
                'Status is required.',

            'status.in' =>
                'The selected status is invalid.',
        ];
    }
}