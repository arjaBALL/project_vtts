<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class Office extends Authenticable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'office',
        'abbreviation'
    ];
}
