<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return redirect('/dashboard');
});

// * Main Pages
Route::get('/dashboard', function () {
    return Inertia::render('Main/Dashboard');
});

// * Requester Pages
Route::get('/request-trip-ticket', function () {
    return Inertia::render('Requester/RequestTripTickets');
});

Route::get('/my-tickets', function () {
    return Inertia::render('Requester/MyTickets');
});

// * Processor Pages
Route::get('/incoming-queue', function () {
    return Inertia::render('Processor/IncomingQueue');
});

Route::get('/assign-review', function () {
    return Inertia::render('Processor/AssignReview');
});

// * Data Management Pages
Route::get('/drivers', function () {
    return Inertia::render('DataManagement/Drivers');
});

Route::get('/users', function () {
    return Inertia::render('DataManagement/Users');
});

Route::get('/vehicles', function () {
    return Inertia::render('DataManagement/Vehicles');
});

Route::get('/profile', function () {
    return Inertia::render('Account/Profile');
});