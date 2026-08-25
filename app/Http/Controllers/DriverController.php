<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\http\Requests\StoreDriverRequest;
use App\models\Driver;
use App\Services\Driver\DriverService;
use Inertia\Inertia;

class DriverController extends Controller
{
    public function __construct(
        protected DriverService $service
    ) {}

    public function index(Request $request)
        {
            $search = $request->query('search');

            $drivers = Driver::query()
                ->join('users', 'drivers.user_id', '=', 'users.id')
                ->join('offices', 'users.office_id', '=', 'offices.id')
                ->where('users.role', 'driver')
                ->where('users.status', 'active')
                ->select([
                    'drivers.id',
                    'users.username',
                    'users.first_name',
                    'users.middle_name',
                    'users.last_name',
                    'users.office_id',
                    'offices.abbreviation',
                    'drivers.license_number',
                    'drivers.license_expiry'
                ])
                ->when($search, function ($query, $search) {
                    $query->where(function ($q) use ($search) {
                        $q->where('users.first_name', 'like', "%{$search}%")
                            ->orWhere('users.username', 'like', "%{$search}%")
                            ->orWhere('users.middle_name', 'like', "%{$search}%")
                            ->orWhere('users.last_name', 'like', "%{$search}%")
                            ->orWhere('offices.abbreviation', 'like', "%{$search}%")
                            ->orWhere('drivers.license_number', 'like', "%{$search}%")
                            ->orWhere('drivers.license_expiry', 'like', "%{$search}%");
                    });
                })
                
                ->orderBy('users.first_name')
                ->paginate(10)
                ->withQueryString();

                return Inertia::render('DataManagement/Drivers', [
                'drivers' => $drivers,           
                'filters' => [
                    'search' => $search,
                ],
            ]);
        }
}