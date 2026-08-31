<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Ticket\StoreTicketRequest;
use App\Http\Requests\Ticket\AssignTripTicketRequest;
use App\Models\TripTicket;
use App\Services\Ticket\TicketService;
use App\Services\Ticket\AssignTripTicketService;
use App\Services\Driver\DriverService;
use App\Services\Vehicle\VehicleService;
use Inertia\Inertia;

class TripTicketController extends Controller
{

    public function __construct(
        protected TicketService $service,
        protected AssignTripTicketService $assignTripTicketService,
        protected DriverService $driverService,
        protected VehicleService $vehicleService
    ) {

    }

    // Fetch data for employee created tickets
    public function index(Request $request)
    {
        $search = $request->query('search');

        $triptickets = TripTicket::query()
            ->where('trip_tickets.user_id', auth()->id())
            ->select([
                'id',
                'user_id',
                'trip_ticket_no',
                'departure_date',
                'return_date',
                'destination',
                'passengers',
                'purpose',
                'status',
            ])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('departure_date', 'like', "%{$search}%")
                        ->orWhere('return_date', 'like', "%{$search}%")
                        ->orWhere('destination', 'like', "%{$search}%")
                        ->orWhere('passengers', 'like', "%{$search}%")
                        ->orWhere('purpose', 'like', "%{$search}%")
                        ->orWhere('status', 'like', "%{$search}%");
                });
            })
            ->orderBy('departure_date')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Requester/RequestTripTickets', [
            'triptickets' => $triptickets,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    //Fetch data for admin review ticket with status pending
    public function assignIndex(Request $request)
    {
        $search = $request->query('search');

        $triptickets = TripTicket::query()
            ->select([
                'id',
                'user_id',
                'driver_id',
                'vehicle_id',
                'trip_ticket_no',
                'departure_date',
                'return_date',
                'destination',
                'passengers',
                'purpose',
                'status',
            ])
            ->with([
                'driver:id,first_name,middle_name,last_name',
                'vehicle:id,model,plate_number,capacity',
            ])
            ->where('status', 'pending')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('departure_date', 'like', "%{$search}%")
                        ->orWhere('return_date', 'like', "%{$search}%")
                        ->orWhere('destination', 'like', "%{$search}%")
                        ->orWhere('passengers', 'like', "%{$search}%")
                        ->orWhere('purpose', 'like', "%{$search}%");
                });
            })
            ->orderBy('departure_date')
            ->paginate(10)
            ->withQueryString();

        $drivers = $this->driverService->options();
        $vehicles = $this->vehicleService->vehicleOptions();

        return Inertia::render('Processor/AssignReview', [
            'triptickets' => $triptickets,
            'drivers' => $drivers,
            'vehicles' => $vehicles,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function assigned(Request $request)
    {
        $search = $request->query('search');

        $triptickets = TripTicket::query()
            ->select([
                'id',
                'user_id',
                'driver_id',
                'vehicle_id',
                'trip_ticket_no',
                'departure_date',
                'return_date',
                'destination',
                'passengers',
                'purpose',
                'status',
            ])
            ->with([
                'driver:id,first_name,middle_name,last_name',
                'vehicle:id,model,plate_number,capacity',
            ])
            ->where('status', 'approved')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('departure_date', 'like', "%{$search}%")
                        ->orWhere('return_date', 'like', "%{$search}%")
                        ->orWhere('destination', 'like', "%{$search}%")
                        ->orWhere('passengers', 'like', "%{$search}%")
                        ->orWhere('purpose', 'like', "%{$search}%");
                });
            })
            ->orderBy('departure_date')
            ->paginate(10)
            ->withQueryString();

        $drivers = $this->driverService->options();
        $vehicles = $this->vehicleService->vehicleOptions();

        return Inertia::render('Processor/IncomingQueue', [
            'triptickets' => $triptickets,
            'drivers' => $drivers,
            'vehicles' => $vehicles,
            'filters' => [
                'search' => $search,
            ],
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
    public function store(StoreTicketRequest $request)
    {
        $ticket = $this->service->register($request->validated());

        return redirect()
            ->route('triptickets.index')
            ->with('success', 'Trip ticket created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        StoreTicketRequest $request,
        TripTicket $tripticket
    ) {
        $this->service->update($tripticket, $request->validated());

        return redirect()
            ->route('triptickets.index')
            ->with('success', 'Trip ticket updated successfully.');
    }

    public function assign(
        AssignTripTicketRequest $request,
        TripTicket $tripticket
    ) {
        $this->assignTripTicketService->assign(
            $tripticket,
            $request->validated()
        );

        return redirect()
            ->route('triptickets.assign.index')
            ->with('success', 'Driver and vehicle assigned successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TripTicket $tripticket)
    {
        $tripticket->delete();

        return redirect()
            ->route('triptickets.index')
            ->with('success', 'Trip ticket deleted successfully.');
    }
}
