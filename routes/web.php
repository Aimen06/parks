<?php

use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ParkingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UnavailabilityController;
use App\Http\Controllers\UserController;
use App\Models\BillingMethod;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/dashboard');
    } else {
        return Inertia::render('guest/HomeGuest');
    }
})->name('home');

Route::get('/rent-park', function () {
    return Inertia::render('guest/RentPark');
})->name('rent-park');


Route::get('/about', function () {
    return Inertia::render('guest/About');
})->name('about');

Route::get('/contact', [ContactController::class, 'create'])->name('contact.create');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('users', UserController::class);
    Route::resource('roles', RoleController::class);
    Route::resource('parkings', ParkingController::class);
    Route::resource('bookings', BookingController::class);
    Route::resource('reviews', ReviewController::class);
    Route::resource('invoices', InvoiceController::class);
    Route::resource('payments', PaymentController::class);
    Route::resource('billing-methods', BillingMethod::class);
    Route::resource('availabilities', AvailabilityController::class);
    Route::resource('unavailabilities', UnavailabilityController::class);
});


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
