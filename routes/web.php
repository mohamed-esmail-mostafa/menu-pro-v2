<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PublicController;

Route::get('/', [PublicController::class, 'home_page'])->name('home');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/public.php';
require __DIR__.'/redirect.php';
require __DIR__.'/settings.php';
// require __DIR__.'/roles.php';
require __DIR__.'/countries.php';
require __DIR__.'/stores.php';
require __DIR__.'/categories.php';
require __DIR__.'/products.php';
require __DIR__.'/tables.php';
require __DIR__.'/website-settings.php';
require __DIR__.'/orders.php';
