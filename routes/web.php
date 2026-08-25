<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OfficeController;
use App\Http\Controllers\DriverController;

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
Route::post('/users/{user}/license', [DriverController::class, 'storeLicense'])
    ->name('drivers.license.store');

Route::put('/drivers/{driver}/license', [DriverController::class, 'updateLicense'])
    ->name('drivers.license.update');

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







Route::get('/vehicles', function () {
    return Inertia::render('DataManagement/Vehicles');
});

Route::get('/profile', function () {
    return Inertia::render('Account/Profile');
});