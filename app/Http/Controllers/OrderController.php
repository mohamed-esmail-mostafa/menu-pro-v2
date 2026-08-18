<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function orders_store_page(string $slug){
        return Inertia::render("orders/index");
    }
}
