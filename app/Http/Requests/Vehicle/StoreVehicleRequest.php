<?php

namespace App\Http\Requests\Vehicle;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVehicleRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'plate_number' => ['required', 'string', 'max:255', 'unique:vehicles,plate_number'],
            'office_id' => ['required', 'integer', 'exists:offices,id'],
            'vehicle_type_id' => ['required', 'integer', 'exists:vehicle_types,id'],
            'model' => ['required', 'string', 'max:255'],
            'year_model' => ['required', 'integer', 'digits:4', 'min:1900', 'max:' . (date('Y') + 1)],
            'capacity' => ['nullable', 'integer', 'min:0', 'max:255'],
            'fuel_type' => ['nullable', Rule::in(['gasoline', 'diesel', 'electric', 'hybrid'])],
            'fleet_card_number' => ['nullable', 'string', 'max:255', 'unique:vehicles,fleet_card_number'],
            'fuel_consumption' => ['nullable', 'numeric', 'min:0', 'max:999.99'],
            'status' => ['required', Rule::in(['active', 'under_maintenance', 'inactive', 'disposed', 'retired'])],
        ];
    }

    public function messages()
    {
        return [
            'plate_number.unique' => 'This plate number is already registered.',
            'fleet_card_number.unique' => 'This fleet card number is already assigned to another vehicle.',
            'office_id.exists' => 'The selected office does not exist.',
            'vehicle_typeexists' => 'The selected vehicle type does not exist.',
            'year_model.digits' => 'Year model must be a 4-digit year.',
        ];
    }
}