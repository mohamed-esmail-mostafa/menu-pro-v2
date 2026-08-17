<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::controller(ProductController::class)->group(function () {
    Route::get('/store/products/page/{slug}', 'store_products_page')->name('store.products.page')->middleware('auth');
    Route::post('/store/product/store', 'store_products_to_store')->name('store.product.store')->middleware('auth');
    Route::put('/store/product/update/{id}', 'update_product')->name('store.product.update')->middleware('auth');
    Route::delete('/store/product/delete/{id}', 'delete_product')->name('store.product.delete')->middleware('auth');
});