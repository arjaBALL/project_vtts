<?php

namespace App\Http\Requests\Ticket;

use Illuminate\Foundation\Http\FormRequest;

class AssignTripTicketRequest extends FormRequest
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

        return []; }
    

    public function create_rules(): array
    {
        return [
            'driver_id' => ['required', 'exists:users,id'],
            'vehicle_id' => ['required', 'exists:vehicles,id'],
        ];
    }

    public function update_rules(): array {
        return [
            'status' => ['required', 'in:rejected'],
        ];

    }


}