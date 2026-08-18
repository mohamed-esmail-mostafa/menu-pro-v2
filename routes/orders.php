<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;



Route::controller(OrderController::class)->group(function () {
  Route::get("orders/store/page/{slug}","orders_store_page");
});