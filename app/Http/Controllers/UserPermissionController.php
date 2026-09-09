<?php

namespace App\Http\Controllers;

use App\Models\UserPermission;
use App\Services\User\UserService;
use App\Models\Role;
use App\Services\User\UserPermissionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserPermissionController extends Controller
{
    public function __construct(protected UserPermissionService $service)
    {
    }
    public function index(Request $request)
    {
        $roles = Role::with('permissions.module')
            ->get()
            ->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,

                    'modules' => $role->permissions
                        ->map(function ($permission) {
                            return [
                                'id' => $permission->module_id,
                                'name' => $permission->module->name,

                                'view' => (bool) $permission->can_view,
                                'add' => (bool) $permission->can_add,
                                'update' => (bool) $permission->can_update,
                                'delete' => (bool) $permission->can_delete,
                            ];
                        })
                        ->values(),
                ];
            });

        return Inertia::render('DataManagement/ManageUserAccess', [
            'roles' => $roles,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(UserPermission $userPermission)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserPermission $userPermission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserPermission $userPermission)
    {
        $validated = $request->validated();


    }

    public function saveMatrix(Request $request)
    {
        $validated = $request->validate([
            'roles' => 'required|array',
            'roles.*.name' => 'required|string',
            'roles.*.modules' => 'required|array',
            'roles.*.modules.*.name' => 'required|string',
            'roles.*.modules.*.view' => 'boolean',
            'roles.*.modules.*.add' => 'boolean',
            'roles.*.modules.*.update' => 'boolean',
            'roles.*.modules.*.delete' => 'boolean',
        ]);

        $this->service->saveMatrix($validated['roles']);

        return back()->with('success', 'Role permissions updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserPermission $userPermission)
    {
        //
    }
}
