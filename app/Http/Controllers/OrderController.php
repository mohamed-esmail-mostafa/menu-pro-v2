<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Store;
use App\Services\OrderService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService) {}

    /**
     * Render store orders management page.
     */
    public function orders_store_page(string $slug): Response
    {
        $store = Store::with(['orders' => function ($query) {
            $query->with('order_items')->latest();
        }])->where('slug', $slug)->firstOrFail();

        return Inertia::render('orders/index', [
            'store'  => $store,
            'orders' => $store,
        ]);
    }

    /**
     * Submit/create a new order.
     */
    public function send_order(Request $request): RedirectResponse
    {
        $request->validate([
            'store_id' => 'required|exists:stores,id',
            'total'    => 'required|numeric|min:0',
            'items'    => 'nullable|array',
        ]);

        $this->orderService->createOrder($request);

        return redirect()->back()->with('success', 'Order created successfully');
    }

    /**
     * Update order status.
     */
    public function update_status(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,confirmed,preparing,ready,out_for_delivery,delivered,cancelled',
        ]);

        $this->orderService->updateOrderStatus($order, $validated['status']);

        return redirect()->back()->with('success', 'Order status updated successfully');
    }
}

