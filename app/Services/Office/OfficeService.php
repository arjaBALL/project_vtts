<?php

namespace App\Services\Office;

use App\Models\Office;
use Illuminate\Support\Facades\DB;

class OfficeService
{
    public function register(array $data): Office
    {
        return DB::transaction(function () use ($data) {
            return Office::create([
                'office' => $data['office'],
                'abbreviation' => $data['abbreviation'],
            ]);
        });
    }
}