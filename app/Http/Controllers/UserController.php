<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
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

    public function destroy(User $user)
    {
        //abort_if($user->id === auth()->id(), 403, "You can't delete your own account.");
        $user->delete();
        return redirect()->back()->with('success', 'User deleted.');
    }
}