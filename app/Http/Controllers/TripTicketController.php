<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Ticket\StoreTicketRequest;
use App\Models\TripTicket;
use App\Services\Ticket\TicketService;
use Inertia\Inertia;

class TripTicketController extends Controller
{

    public function __construct(
        protected TicketService $service
    ) {

    }

    public function index(Request $request)
    {
        $search = $request->query('search');

        $triptickets = TripTicket::query()
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
        $validated = $request->validated();

        $tripticket->update([
            'departure_date' => $validated['departure_date'],
            'return_date' => $validated['return_date'],
            'destination' => $validated['destination'],
            'passengers' => $validated['passengers'],
            'purpose' => $validated['purpose'],
            'status' => $validated['status'],
        ]);

        return redirect()
            ->route('triptickets.index')
            ->with('success', 'Trip ticket updated successfully.');
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
