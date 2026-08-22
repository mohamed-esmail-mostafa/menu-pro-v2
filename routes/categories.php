<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::controller(CategoryController::class)->group(function () {
    Route::get('/categories/page/{slug}', 'categories_store_page')->name('categories.store.page')->middleware('auth');
    Route::post('/store/categories/{storeId?}', 'storeCategory')->name('store.category.store')->middleware('auth');
    Route::post('/store/categories/update/{id}', 'updateCategory')->name('store.category.update')->middleware('auth');
    Route::put('/store/categories/{id}', 'updateCategory')->middleware('auth');
    Route::delete('/store/categories/{id}', 'deleteCategory')->name('store.category.delete')->middleware('auth');

    // assign categories to store
    Route::post("/assign/category/store", 'assign_category_to_store')->middleware('auth');
});