<?php

use App\Http\Controllers\CountryController;
use Illuminate\Support\Facades\Route;

Route::controller(CountryController::class)->group(function () {
    Route::get('/admin/countries', 'index')->name('countries.page');
    Route::post('/admin/store/country', 'store')->name('country.store');
    Route::get('/admin/edit/country/{id}', 'edit')->name('country.edit');
    Route::post('/admin/update/country/{id}', 'update')->name('country.update');
    Route::get('/admin/delete/country/{id}', 'delete')->name('country.delete');
});