<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends Model
{
    public function permissions(): HasMany
    {
        return $this->hasMany(UserPermission::class, 'role_id');
    }
}