<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicleTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vehicleTypes = [
            'Sedan',
            'SUV',
            'Van',
            'Pickup Truck',
            'Motorcycle',
            'Bus',
            'Ambulance',
            'Dump Truck',
            'Utility Vehicle',
        ];

        $now = now();

        $rows = collect($vehicleTypes)->map(fn($name) => [
            'name' => $name,
            'created_at' => $now,
            'updated_at' => $now,
        ])->all();

        DB::table('vehicle_types')->insertOrIgnore($rows);
    }
}