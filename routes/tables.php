<?php

use App\Http\Controllers\TableController;
use Illuminate\Support\Facades\Route;


Route::controller(TableController::class)->group(function () {
    Route::get('/store/tables/page/{slug}', 'store_tables_page')->name('store.tables.page');
    Route::post('/create/store/tables', 'storeTable')->name('store.table.store');
    Route::put('/store/tables/{id}', 'updateTable')->name('store.table.update');
    Route::delete('/store/tables/{id}', 'deleteTable')->name('store.table.delete');
});
