<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/
// Default route (optional redirect)
Route::get('/', function () {
    return redirect('/dashboard');
});

// * Main Pages

    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    });

    //  Requests Trip Ticket
    Route::get('/request-trip-ticket', function () {
        return Inertia::render('RequestTripTickets');
    });

    // My Tickets
    Route::get('/my-tickets', function () {
        return Inertia::render('MyTickets');
    });

// * Processor Pages

    // Incoming Queue
    Route::get('/incoming-queue', function () {
        return Inertia::render('incomingqueue');
    });

    // Assign & Review
    Route::get('/assign-review', function () {
        return Inertia::render('AssignReview');
    });

// * Data Management Pages

    // Drivers
    Route::get('/drivers', function () {
        return Inertia::render('Drivers');
    });

    // Users
    Route::get('/users', function () {
        return Inertia::render('Users');
    });

    // Vehicles
    Route::get('/vehicles', function () {
        return Inertia::render('Vehicles');
    });