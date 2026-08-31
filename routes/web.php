<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\TripTicketController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// GUEST ONLY (login form)
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

// AUTHENTICATED ONLY
Route::middleware('auth')->group(function () {

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

    // Main Pages
    Route::get('/dashboard', function () {
        return Inertia::render('Main/Dashboard');
    });

    // USER ROUTES
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // OFFICE ROUTES
    Route::get('/offices', [OfficeController::class, 'index'])->name('offices.index');
    Route::post('/offices', [OfficeController::class, 'store'])->name('offices.store');
    Route::put('/offices/{office}', [OfficeController::class, 'update'])->name('offices.update');
    Route::delete('/offices/{office}', [OfficeController::class, 'destroy'])->name('offices.destroy');

    // DRIVER ROUTES
    Route::get('/drivers', [DriverController::class, 'index'])->name('drivers.index');
    Route::post('/drivers', [DriverController::class, 'store'])->name('drivers.store');
    Route::put('/drivers/{driver}', [DriverController::class, 'update'])->name('drivers.update');
    Route::delete('/drivers/{driver}', [DriverController::class, 'destroy'])->name('drivers.destroy');

    // VEHICLE ROUTES
    Route::get('/vehicles', [VehicleController::class, 'index'])->name('vehicles.index');
    Route::post('/vehicles', [VehicleController::class, 'store'])->name('vehicles.store');
    Route::put('/vehicles/{vehicle}', [VehicleController::class, 'update'])->name('vehicles.update');
    Route::delete('/vehicles/{vehicle}', [VehicleController::class, 'destroy'])->name('vehicles.destroy');

    // TRIPTICKET ROUTES ('Employee')
    Route::get('/request-trip-ticket', [TripTicketController::class, 'index'])->name('triptickets.index');
    Route::post('/triptickets', [TripTicketController::class, 'store'])->name('triptickets.store');
    Route::put('/triptickets/{tripticket}', [TripTicketController::class, 'update'])->name('triptickets.update');
    Route::delete('/triptickets/{tripticket}', [TripTicketController::class, 'destroy'])->name('triptickets.destroy');

    // TRIPTICKET REVIEW & ASSIGN
    Route::get('/assign-review', [TripTicketController::class, 'assignIndex'])->name('triptickets.assign.index');
    Route::patch('/assign-review/{tripticket}', [TripTicketController::class, 'assign'])->name('triptickets.assign');

    Route::get('/assigned-trip-tickets', [TripTicketController::class, 'assigned'])->name('triptickets.assigned');

    Route::get('/my-tickets', function () {
        return Inertia::render('Requester/MyTickets');
    });

    Route::get('/profile', function () {
        return Inertia::render('Account/Profile');
    });
});