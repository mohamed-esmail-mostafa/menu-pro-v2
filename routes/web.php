<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PublicController;

Route::get('/', [PublicController::class, 'home_page'])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/public.php';
require __DIR__.'/settings.php';
// require __DIR__.'/roles.php';
require __DIR__.'/countries.php';
require __DIR__.'/stores.php';
