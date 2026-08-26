<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make sure referenced offices exist
        $officeIds = DB::table('offices')->pluck('id');

        if ($officeIds->isEmpty()) {
            DB::table('offices')->insert([
                [
                    'name' => 'Central Office',
                    'office_abbreviation' => 'CO',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
                [
                    'name' => 'Regional Office',
                    'office_abbreviation' => 'RO',
                    'created_at' => now(),
                    'updated_at' => now(),
                ],
            ]);

            $officeIds = DB::table('offices')->pluck('id');
        }

        // Make sure referenced vehicle types exist
        $vehicleTypeIds = DB::table('vehicle_types')->pluck('id');

        if ($vehicleTypeIds->isEmpty()) {
            DB::table('vehicle_types')->insert([
                ['name' => 'Sedan', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'SUV', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'Van', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'Pickup Truck', 'created_at' => now(), 'updated_at' => now()],
                ['name' => 'Motorcycle', 'created_at' => now(), 'updated_at' => now()],
            ]);

            $vehicleTypeIds = DB::table('vehicle_types')->pluck('id');
        }

        $fuelTypes = ['gasoline', 'diesel', 'electric', 'hybrid'];
        $statuses = ['active', 'under_maintenance', 'inactive', 'disposed', 'retired'];

        $vehicles = [];

        for ($i = 0; $i < 30; $i++) {
            $vehicles[] = [
                'plate_number' => strtoupper(Str::random(3)) . '-' . fake()->unique()->numerify('####'),
                'office_id' => $officeIds->random(),
                'vehicle_type_id' => $vehicleTypeIds->random(),
                'model' => fake()->randomElement([
                        'Toyota Hiace',
                        'Toyota Innova',
                        'Mitsubishi Adventure',
                        'Mitsubishi L300',
                        'Ford Ranger',
                        'Isuzu D-Max',
                        'Nissan Urvan',
                        'Hyundai Starex',
                    ]),
                'year_model' => fake()->numberBetween(2005, 2026),
                'capacity' => fake()->numberBetween(2, 54),
                'fuel_type' => fake()->randomElement($fuelTypes),
                'fleet_card_number' => fake()->boolean(70)
                    ? fake()->unique()->numerify('##########')
                    : null,
                'fuel_consumption' => fake()->randomFloat(2, 5, 25),
                'status' => fake()->randomElement($statuses),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('vehicles')->insert($vehicles);
    }
}