<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Services\Office\OfficeService;
use App\Services\User\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct
        (
            protected UserService $service,
            protected OfficeService $officeService
        ) 
    {
}
  public function index(Request $request)
    {
        $search = $request->query('search');

        $users = User::query()
            ->join('offices', 'users.office_id', '=', 'offices.id')
            //  ->where('users.status', 'active')
            ->select([
                'users.id',
                'users.username',
                'users.first_name',
                'users.middle_name',
                'users.last_name',
                'users.office_id',
                'offices.abbreviation',
                'users.role',
                'users.status',
            ])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('users.first_name', 'like', "%{$search}%")
                        ->orWhere('users.username', 'like', "%{$search}%")
                        ->orWhere('users.middle_name', 'like', "%{$search}%")
                        ->orWhere('users.last_name', 'like', "%{$search}%")
                        ->orWhere('offices.abbreviation', 'like', "%{$search}%")
                        ->orWhere('users.role', 'like', "%{$search}%")
                        ->orWhere('users.status', 'like', "%{$search}%");
                });
            })
            ->orderBy('users.first_name')
            ->paginate(10)
            ->withQueryString();

        $offices = $this->officeService->options();

        return Inertia::render('DataManagement/Users', [
            'users' => $users,
            'offices' => $offices,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(StoreUserRequest $request)
        {
            $this->service->register($request->validated());

            return redirect()
                ->route('users.index')
                ->with('success', 'User created successfully.');
        }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'username' => [
                'required',
                'string',
                'min:3',
                'max:255',
                'unique:users,username,' . $user->id,
            ],
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'office_id' => ['required', 'integer', 'exists:offices,id'],
            'role' => ['required', 'string', 'in:admin,staff,user'],
            'status' => ['required', 'string', 'in:active,inactive'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
        ]);

        $user->username = $validated['username'];
        $user->first_name = $validated['first_name'];
        $user->middle_name = $validated['middle_name'] ?? null;
        $user->last_name = $validated['last_name'];
        $user->office_id = $validated['office_id'];
        $user->role = $validated['role'];
        $user->status = $validated['status'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return redirect()
            ->route('users.index')
            ->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        //abort_if($user->id === auth()->id(), 403, "You can't delete your own account.");
        $user->delete();
        return redirect()->back()->with('success', 'User deleted.');
    }
}