<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::controller(OrderController::class)->group(function () {
    Route::get("orders/store/page/{slug}", "orders_store_page")->name("orders.store.page");
    Route::post("send/order", "send_order")->name("orders.send");
    Route::patch("orders/{order}/status", "update_status")->name("orders.update_status");
});