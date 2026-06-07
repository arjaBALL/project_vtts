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
    return redirect('Main/dashboard');
});

// * Main Pages

// Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Main/Dashboard');
});

//  Requests Trip Ticket
Route::get('/request-trip-ticket', function () {
    return Inertia::render('Requester/RequestTripTickets');
});

// My Tickets
Route::get('/my-tickets', function () {
    return Inertia::render('Requester/MyTickets');
});

// * Processor Pages

// Incoming Queue
Route::get('/incoming-queue', function () {
    return Inertia::render('Processor/IncomingQueue');
});

// Assign & Review
Route::get('/assign-review', function () {
    return Inertia::render('Processor/AssignReview');
});

// * Data Management Pages

// Drivers
Route::get('/drivers', function () {
    return Inertia::render('DataManagement/Drivers');
});

// Users
Route::get('/users', function () {
    return Inertia::render('DataManagement/Users');
});

// Vehicles
Route::get('/vehicles', function () {
    return Inertia::render('DataManagement/Vehicles');
});