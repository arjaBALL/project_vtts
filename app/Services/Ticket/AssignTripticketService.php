<?php

namespace App\Services\Ticket;

use App\Models\TripTicket;
use Illuminate\Support\Facades\DB;

class AssignTripTicketService
{
    public function assign(TripTicket $tripticket, array $data): TripTicket
    {
        return DB::transaction(function () use ($tripticket, $data) {
            $tripticket->update([
                'driver_id' => $data['driver_id'],
                'vehicle_id' => $data['vehicle_id'],
                'status' => 'approved',
            ]);

            return $tripticket->fresh();
        });
    }


}