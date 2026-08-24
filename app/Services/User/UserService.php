<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserService
{
    public function register(array $data): User
    {
        return DB::transaction(function () use ($data) {
            return User::create([
                'username' => $data['username'],
                'first_name' => $data['first_name'],
                'middle_name' => $data['middle_name'] ?? null,
                'last_name' => $data['last_name'],
                'password' => $data['password'], // auto-hashed via model cast
                'role' => $data['role'],
                'status' => 'active',
            ]);
        });
    }


}