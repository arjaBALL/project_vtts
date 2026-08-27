<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\TripTicketController;

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

// USER ROUTES

// Route::middleware(['auth'])->group(function () {
Route::get('/users', [UserController::class, 'index'])->name('users.index');
Route::post('/users', [UserController::class, 'store'])->name('users.store');
Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
// });

//OFFICE ROUTES

// Route::middleware(['auth'])->group(function () {
Route::get('/offices', [OfficeController::class, 'index'])->name('offices.index');
Route::post('/offices', [OfficeController::class, 'store'])->name('offices.store');
Route::put('/offices/{office}', [OfficeController::class, 'update'])->name('offices.update');
Route::delete('/offices/{office}', [OfficeController::class, 'destroy'])->name('offices.destroy');
// });

// DRIVER ROUTES

// DRIVER ROUTES
Route::get('/drivers', [DriverController::class, 'index'])->name('drivers.index');
Route::post('/drivers', [DriverController::class, 'store'])->name('drivers.store');
Route::put('/drivers/{driver}', [DriverController::class, 'update'])->name('drivers.update');
Route::delete('/drivers/{driver}', [DriverController::class, 'destroy'])->name('drivers.destroy');


// Vehicle ROUTES
Route::get('/vehicles', [VehicleController::class, 'index'])->name('vehicles.index');
Route::post('/vehicles', [VehicleController::class, 'store'])->name('vehicles.store');
Route::put('/vehicles/{vehicle}', [VehicleController::class, 'update'])->name('vehicles.update');
Route::delete('/vehicles/{vehicle}', [VehicleController::class, 'destroy'])->name('vehicles.destroy');

// TRIPTICKET ROUTES
Route::get('/request-trip-ticket', [TripTicketController::class, 'index'])->name('triptickets.index');
Route::post('/triptickets', [TripTicketController::class, 'store'])->name('triptickets.store');
Route::put('/triptickets/{tripticket}', [TripTicketController::class, 'update'])->name('triptickets.update');
Route::delete('/triptickets/{tripticket}', [TripTicketController::class, 'destroy'])->name('triptickets.destroy');

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

Route::get('/profile', function () {
    return Inertia::render('Account/Profile');
});