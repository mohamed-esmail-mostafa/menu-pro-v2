import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';

export interface WishlistItem {
    id: string;
    productId: number;
    storeId: number;
    product: Product;
}

export interface WishlistState {
    items: WishlistItem[];
}

const initialState: WishlistState = {
    items: [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (
            state,
            action: PayloadAction<{ product: Product; storeId: number }>
        ) => {
            const { product, storeId } = action.payload;
            const itemId = `${storeId}-${product.id}`;
            const existingIndex = state.items.findIndex((item) => item.id === itemId);

            if (existingIndex > -1) {
                state.items.splice(existingIndex, 1);
            } else {
                state.items.push({
                    id: itemId,
                    productId: product.id,
                    storeId,
                    product,
                });
            }
        },
        removeFromWishlist: (
            state,
            action: PayloadAction<{ productId: number; storeId: number }>
        ) => {
            const itemId = `${action.payload.storeId}-${action.payload.productId}`;
            state.items = state.items.filter((item) => item.id !== itemId);
        },
        clearWishlist: (state, action: PayloadAction<{ storeId: number }>) => {
            state.items = state.items.filter((item) => item.storeId !== action.payload.storeId);
        },
    },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
