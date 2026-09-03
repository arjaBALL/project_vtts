<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticable;

class Vehicle_type extends Model
{
    /** @use HasFactory<\Database\Factories\VehicleFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
    ];
}