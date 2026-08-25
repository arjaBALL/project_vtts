<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Office;

class OfficeSeeder extends Seeder
{
    public function run(): void
    {
        Office::create([
            'office' => 'Regional Office 8',
            'abbreviation' => 'RO8',
        ]);      
    }
}