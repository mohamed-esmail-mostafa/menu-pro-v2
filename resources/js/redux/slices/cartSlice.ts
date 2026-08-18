import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';

export interface CartItem {
    id: string;
    productId: number;
    storeId: number;
    product: Product;
    quantity: number;
    unitPrice: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const getUnitPrice = (product: Product): number => {
    if (product.sale_price !== undefined && product.sale_price !== null && Number(product.sale_price) > 0) {
        return Number(product.sale_price);
    }
    return Number(product.price || 0);
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{ product: Product; storeId: number; quantity?: number }>
        ) => {
            const { product, storeId, quantity = 1 } = action.payload;
            const itemId = `${storeId}-${product.id}`;
            const existingIndex = state.items.findIndex((item) => item.id === itemId);

            if (existingIndex > -1) {
                state.items[existingIndex].quantity += quantity;
            } else {
                state.items.push({
                    id: itemId,
                    productId: product.id,
                    storeId,
                    product,
                    quantity,
                    unitPrice: getUnitPrice(product),
                });
            }
        },
        removeFromCart: (
            state,
            action: PayloadAction<{ productId: number; storeId: number }>
        ) => {
            const itemId = `${action.payload.storeId}-${action.payload.productId}`;
            state.items = state.items.filter((item) => item.id !== itemId);
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ productId: number; storeId: number; quantity: number }>
        ) => {
            const { productId, storeId, quantity } = action.payload;
            const itemId = `${storeId}-${productId}`;
            const existingIndex = state.items.findIndex((item) => item.id === itemId);

            if (existingIndex > -1) {
                if (quantity <= 0) {
                    state.items.splice(existingIndex, 1);
                } else {
                    state.items[existingIndex].quantity = quantity;
                }
            }
        },
        clearStoreCart: (state, action: PayloadAction<{ storeId: number }>) => {
            state.items = state.items.filter((item) => item.storeId !== action.payload.storeId);
        },
        clearAllCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearStoreCart, clearAllCart } =
    cartSlice.actions;

export default cartSlice.reducer;
