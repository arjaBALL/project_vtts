<?php

// app/Services/UserPermission/UserPermissionService.php
namespace App\Services\User;

use App\Models\Module;
use App\Models\Role;
use App\Models\UserPermission;
use Illuminate\Support\Facades\DB;

class UserPermissionService
{
    public function register(array $data): UserPermission
    {
        return DB::transaction(function () use ($data) {
            return UserPermission::create([
                'role_id' => $data['role_id'],
                'module_id' => $data['module_id'],
                'can_view' => $data['can_view'] ?? false,
                'can_add' => $data['can_add'] ?? false,
                'can_update' => $data['can_update'] ?? false,
                'can_delete' => $data['can_delete'] ?? false,
            ]);
        });
    }

    public function saveMatrix(array $roles): void
    {
        DB::transaction(function () use ($roles) {
            foreach ($roles as $roleData) {
                $role = Role::where('name', $roleData['name'])->firstOrFail();

                foreach ($roleData['modules'] as $mod) {
                    $module = Module::firstOrCreate(['name' => $mod['name']]);

                    UserPermission::updateOrCreate(
                        ['role_id' => $role->id, 'module_id' => $module->id],
                        [
                            'can_view' => $mod['view'] ?? false,
                            'can_add' => $mod['add'] ?? false,
                            'can_update' => $mod['update'] ?? false,
                            'can_delete' => $mod['delete'] ?? false,
                        ]
                    );
                }
            }
        });
    }
}