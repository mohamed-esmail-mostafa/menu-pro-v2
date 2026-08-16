<?php

use App\Http\Controllers\StoreController;
use Illuminate\Support\Facades\Route;



Route::controller(StoreController::class)->group(function () {
    Route::get('/register/store/page', 'register_store_page')->name('register.store.page')->middleware('auth');
    Route::post('/create/store', 'create_store')->name('create.store')->middleware('auth');
    Route::get('/store/update/page/{id}', 'update_store_page')->name('store.update.page')->middleware('auth');
    Route::post('/store/update/{id}', 'update_store')->name('vendor.store.update')->middleware('auth');
    Route::get('/vendor/stores/page' , 'vendor_stores_page')->name('stores.vendor.stores')->middleware('auth');
    Route::get('/store/dashboard/{storeId?}', 'store_dashboard')->name('store.dashboard')->middleware('auth'); 
});