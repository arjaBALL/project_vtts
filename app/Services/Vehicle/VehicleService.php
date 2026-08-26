<?php

namespace App\Services\Vehicle;

use App\Models\Vehicle;
use Illuminate\Support\Facades\DB;

class VehicleService
{
    public function register(array $data): Vehicle
    {
        return DB::transaction(function () use ($data) {
            return Vehicle::create([
                'plate_number' => $data['plate_number'],
                'office_id' => $data['office_id'],
                'vehicle_type_id' => $data['vehicle_type_id'],
                'model' => $data['model'],
                'year_model' => $data['year_model'],
                'capacity' => $data['capacity'],
                'fuel_type' => $data['fuel_type'],
                'fleet_card_number' => $data['fleet_card_number'] ?? null,
                'fuel_consumption' => $data['fuel_consumption'],
                'status' => $data['status'],                
            ]);
        });
    }
}