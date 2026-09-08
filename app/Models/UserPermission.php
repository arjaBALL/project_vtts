<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserPermission extends Model
{
    protected $table = 'permissions';
    protected $fillable = ['role_id', 'module_id', 'can_view', 'can_add', 'can_update', 'can_delete',];

    protected $casts = [
        'can_view' => 'boolean',
        'can_add' => 'boolean',
        'can_update' => 'boolean',
        'can_delete' => 'boolean',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

}
