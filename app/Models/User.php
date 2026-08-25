<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'username',
        'last_name',
        'first_name',
        'middle_name',
        'password',
        'office_id',
        'role',
        'status'
    ];

    protected $hidden = [
        'password'
    ];

    protected function casts(): array
    {
        return ['password' => 'hashed'];
    }
}