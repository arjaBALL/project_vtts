<?php

namespace App\Services\Driver;

use App\Models\Driver;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DriverService
{

    public function register(array $data): Driver
        {
            return DB::transaction(function () use ($data) {
                return Driver::create([
                    'user_id' => $data['user_id'],
                    'license_number' => $data['license_number'],
                    'license_expiry' => $data['license_expiry'] ?? null
                ]);
            });
        }
    public function update(Driver $driver, array $data): Driver
        {
            $driver->update([
                'license_number' => $data['license_number'],
                'license_expiry' => $data['license_expiry'],
            ]);

            return $driver->fresh();
        }

   public function options()
        {
            return User::query()
                ->select(
                    'id',
                    'users.first_name',
                    'users.middle_name',
                    'users.last_name'
                )
                ->where('role', 'driver')
                ->whereHas('driver', function ($query) {
                    $query->whereNotNull('license_number')
                        ->whereRaw("TRIM(license_number) <> ''")
                        ->whereNotNull('license_expiry')
                        ->whereDate('license_expiry', '>=', now()->toDateString());
                })
                ->orderBy('last_name')
                ->get();
        }
}