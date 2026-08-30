<?php

namespace App\Services\Ticket;

use App\Models\TripTicket;
use Illuminate\Support\Facades\DB;

class TicketService
{
    public function register(array $data): TripTicket
    {
        return DB::transaction(function () use ($data) {
            return TripTicket::create([
                'user_id' => 1, // temporary bypass
                'trip_ticket_no' => $this->generateTicketNo(),
                'departure_date' => $data['departure_date'],
                'return_date' => $data['return_date'],
                'destination' => $data['destination'],
                'passengers' => $data['passengers'],
                'purpose' => $data['purpose'],
                'status' => 'pending',
            ]);
        });
    }

    public function update(TripTicket $tripTicket, array $data): TripTicket
    {
        $tripTicket->update([
            'departure_date' => $data['departure_date'],
            'return_date' => $data['return_date'],
            'destination' => $data['destination'],
            'passengers' => $data['passengers'],
            'purpose' => $data['purpose'],
        ]);

        return $tripTicket;
    }

    private function generateTicketNo(): string
    {
        return 'TT-' . now()->format('Ymd') . '-' . str_pad(
            TripTicket::withTrashed()
                ->whereDate('created_at', today())
                ->count() + 1,
            4,
            '0',
            STR_PAD_LEFT
        );
    }
}