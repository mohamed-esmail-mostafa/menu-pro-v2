<?php

use App\Http\Controllers\CountryController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

Route::controller(PublicController::class)->group(function () {
    Route::get('/', 'home_page');






    // admin
     Route::get("admin/dashboard" , "admin_dashboard")->middleware("auth");
     Route::get("admin/categories/page" , "admin_categories_page")->middleware("auth");
     Route::get("admin/countries/page" , "admin_countries_page")->middleware("auth");
});