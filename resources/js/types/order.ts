export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'preparing'
    | 'ready'
    | 'out_for_delivery'
    | 'delivered'
    | 'cancelled';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export type PaymentMethod = 'cash' | 'card' | 'wallet' | 'online';

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number | null;
    product_name: string;
    price: string | number;
    quantity: number;
    total: string | number | null;
    selected_options?: any;
    notes?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface Order {
    id: number;
    store_id: number;
    order_number: string;
    order_status: OrderStatus;
    payment_status: PaymentStatus;
    payment_method: PaymentMethod;
    subtotal: string | number;
    discount: string | number;
    tax: string | number;
    delivery_fee: string | number;
    total: string | number;
    note?: string | null;
    name?: string | null;
    phone?: string | null;
    address?: string | null;
    table_id?: number | null;
    table_no?: string | number | null;
    created_at: string;
    updated_at: string;
    order_items: OrderItem[];
}
