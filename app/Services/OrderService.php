<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderService
{
    /**
     * Create a new order with its items inside a database transaction.
     */
    public function createOrder(Request $request): Order
    {
        return DB::transaction(function () use ($request) {
            $order = Order::create([
                'store_id'       => $request->input('store_id'),
                'table_id'       => $request->input('table_id'),
                'table_no'       => $request->input('table_no'),
                'order_number'   => $this->generateOrderNumber((int) $request->input('store_id')),
                'order_status'   => $request->input('order_status', 'pending'),
                'payment_status' => $request->input('payment_status', 'pending'),
                'payment_method' => $request->input('payment_method', 'cash'),
                'subtotal'       => $request->input('subtotal', 0),
                'discount'       => $request->input('discount', 0),
                'tax'            => $request->input('tax', 0),
                'delivery_fee'   => $request->input('delivery_fee', 0),
                'total'          => $request->input('total', 0),
                'note'           => $request->input('note'),
                'name'           => $request->input('name'),
                'phone'          => $request->input('phone'),
                'address'        => $request->input('address'),
            ]);

            $items = $request->input('items', []);
            foreach ($items as $item) {
                $productId = $item['productId'] ?? $item['product_id'] ?? null;
                $productName = $item['product']['title'] ?? $item['product_name'] ?? ('Product #' . $productId);
                $quantity = (int) ($item['quantity'] ?? 1);
                $price = (float) ($item['unitPrice'] ?? $item['price'] ?? 0);
                $total = isset($item['total']) && $item['total'] !== null ? (float) $item['total'] : ($price * $quantity);

                OrderItem::create([
                    'order_id'         => $order->id,
                    'product_id'       => $productId,
                    'product_name'     => $productName,
                    'quantity'         => $quantity,
                    'price'            => $price,
                    'total'            => $total,
                    'selected_options' => $item['selected_options'] ?? null,
                    'notes'            => $item['notes'] ?? null,
                ]);
            }

            return $order;
        });
    }

    /**
     * Update the status of an order.
     */
    public function updateOrderStatus(Order $order, string $status): Order
    {
        $order->update(['order_status' => $status]);
        return $order;
    }

    /**
     * Generate a unique sequential order number per store.
     */
    private function generateOrderNumber(int $storeId): string
    {
        $lastOrder = Order::where('store_id', $storeId)->latest('id')->value('order_number');
        if (!$lastOrder) {
            return 'ORD-000001';
        }

        $number = (int) str_replace('ORD-', '', $lastOrder);
        return 'ORD-' . str_pad((string) ($number + 1), 6, '0', STR_PAD_LEFT);
    }
}

