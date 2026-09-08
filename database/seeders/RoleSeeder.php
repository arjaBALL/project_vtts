<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('roles')->upsert([
            [
                'name' => 'Admin',
                'description' => 'Full access to the system.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Staff',
                'description' => 'Staff access to system features.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'User',
                'description' => 'Standard user access.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Driver',
                'description' => 'Driver access to system features.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['name'], ['description', 'updated_at']);
    }
}