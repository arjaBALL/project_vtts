<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Services\User\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(
        protected UserService $service
    ) {
    }

    public function index(Request $request)
    {
        $search = $request->query('search');

        $users = User::query()
            ->select([
                'id',
                'username',
                'first_name',
                'middle_name',
                'last_name',
                'role',
                'status',
            ])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('username', 'like', "%{$search}%")
                        ->orWhere('middle_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('role', 'like', "%{$search}%");
                });
            })
            ->orderBy('first_name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('DataManagement/Users', [
            'users' => $users,
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
                'role' => ['required', 'string', 'in:admin,staff,user'],
                'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            ]);

            $user->username = $validated['username'];
            $user->first_name = $validated['first_name'];
            $user->middle_name = $validated['middle_name'] ?? null;
            $user->last_name = $validated['last_name'];
            $user->role = $validated['role'];

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