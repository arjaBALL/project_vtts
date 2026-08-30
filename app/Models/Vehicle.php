<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticable;

class Vehicle extends Model
{
    /** @use HasFactory<\Database\Factories\VehicleFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'plate_number',
        'office_id',
        'vehicle_type_id',
        'model',
        'year_model',
        'capacity',
        'fuel_type',
        'fleet_card_number',
        'fuel_consumption',
        'status'
    ];

    public function tripTickets()
    {
        return $this->hasMany(TripTicket::class);
    }
}