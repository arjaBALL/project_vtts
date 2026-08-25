<?php

namespace App\Services\Driver;

use App\Models\Driver;

class DriverService
{
    public function update(Driver $driver, array $data): Driver
    {
        $driver->update([
            'license_number' => $data['license_number'],
            'license_expiry' => $data['license_expiry'],
        ]);

        return $driver->fresh();
    }
}