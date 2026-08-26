<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Vehicle\StoreVehicleRequest;
use App\Models\Vehicle;
use App\Services\Vehicle\VehicleService;
use App\Services\Office\OfficeService;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function __construct(
        protected VehicleService $service,
        protected OfficeService $officeService
    ) {
    }

    public function index(Request $request)
    {
        $search = $request->query('search');

        $vehicles = Vehicle::query()
            ->join('offices', 'vehicles.office_id', '=', 'offices.id')
            ->join('vehicle_types', 'vehicles.vehicle_type_id', '=', 'vehicle_types.id')
            ->select([
                'vehicles.id',
                'vehicles.plate_number',
                'vehicle_types.name as vehicle_type',
                'vehicles.model',
                'vehicles.year_model',
                'vehicles.capacity',
                'vehicles.fuel_type',
                'vehicles.fleet_card_number',
                'vehicles.fuel_consumption',
                'vehicles.status',
                'offices.abbreviation as abbreviation',
            ])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('vehicles.plate_number', 'like', "%{$search}%")
                        ->orWhere('vehicles.model', 'like', "%{$search}%")
                        ->orWhere('vehicle_types.name', 'like', "%{$search}%")
                        ->orWhere('vehicles.year_model', 'like', "%{$search}%")
                        ->orWhere('vehicles.capacity', 'like', "%{$search}%")
                        ->orWhere('vehicles.fuel_type', 'like', "%{$search}%")
                        ->orWhere('vehicles.fleet_card_number', 'like', "%{$search}%")
                        ->orWhere('vehicles.fuel_consumption', 'like', "%{$search}%")
                        ->orWhere('offices.abbreviation', 'like', "%{$search}%")
                        ->orWhere('vehicles.status', 'like', "%{$search}%");
                });
            })
            ->orderBy('vehicles.model')
            ->paginate(10)
            ->withQueryString();

        $offices = $this->officeService->options();
        $vehicle_type = $this->service->options();

        return Inertia::render('DataManagement/Vehicles', [
            'vehicles' => $vehicles,
            'offices' => $offices,
            'vehicle_types' => $vehicle_type,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function store(StoreVehicleRequest $request)
    {
        $this->service->register($request->validated());

        return redirect()
            ->route('vehicles.index')
            ->with('success', 'Vehicle added successfully.');
    }

    public function destroy(Vehicle $vehicle)
    {
        //abort_if($vehicle->id === auth()->id(), 403, "You can't delete your own account.");
        $vehicle->delete();
        return redirect()->back()->with('success', 'Vehicle deleted.');
    }
}