import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    addToCart as addToCartAction,
    removeFromCart as removeFromCartAction,
    updateQuantity as updateQuantityAction,
    clearStoreCart as clearStoreCartAction,
    clearAllCart as clearAllCartAction,
    CartItem,
} from '@/redux/slices/cartSlice';
import { Product } from '@/types/product';
import { toast } from 'sonner';

export function useCart(storeId?: number) {
    const dispatch = useAppDispatch();
    const allItems = useAppSelector((state) => state.cart.items);

    const cartItems = useMemo(() => {
        if (!storeId) return allItems;
        return allItems.filter((item) => item.storeId === storeId);
    }, [allItems, storeId]);

    const totalCount = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }, [cartItems]);

    const totalPrice = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    }, [cartItems]);

    const addToCart = (product: Product, targetStoreId?: number, quantity: number = 1, showToast: boolean = true) => {
        const effectiveStoreId = targetStoreId || storeId || product.store_id;
        if (!effectiveStoreId) {
            toast.error('Store ID is required to add item to cart');
            return;
        }
        dispatch(addToCartAction({ product, storeId: effectiveStoreId, quantity }));
        if (showToast) {
            toast.success(`${product.title} added to cart!`, {
                description: `Quantity: ${quantity}`,
            });
        }
    };

    const removeFromCart = (productId: number, targetStoreId?: number) => {
        const effectiveStoreId = targetStoreId || storeId;
        if (!effectiveStoreId) return;
        dispatch(removeFromCartAction({ productId, storeId: effectiveStoreId }));
        toast.info('Item removed from cart');
    };

    const updateQuantity = (productId: number, quantity: number, targetStoreId?: number) => {
        const effectiveStoreId = targetStoreId || storeId;
        if (!effectiveStoreId) return;
        dispatch(updateQuantityAction({ productId, storeId: effectiveStoreId, quantity }));
    };

    const clearCart = (targetStoreId?: number) => {
        const effectiveStoreId = targetStoreId || storeId;
        if (effectiveStoreId) {
            dispatch(clearStoreCartAction({ storeId: effectiveStoreId }));
        } else {
            dispatch(clearAllCartAction());
        }
        toast.info('Cart cleared');
    };

    const isInCart = (productId: number, targetStoreId?: number): boolean => {
        const effectiveStoreId = targetStoreId || storeId;
        if (!effectiveStoreId) return false;
        return cartItems.some((item) => item.productId === productId && item.storeId === effectiveStoreId);
    };

    const getItemQuantity = (productId: number, targetStoreId?: number): number => {
        const effectiveStoreId = targetStoreId || storeId;
        if (!effectiveStoreId) return 0;
        const item = cartItems.find((item) => item.productId === productId && item.storeId === effectiveStoreId);
        return item ? item.quantity : 0;
    };

    const getItem = (productId: number, targetStoreId?: number): CartItem | undefined => {
        const effectiveStoreId = targetStoreId || storeId;
        if (!effectiveStoreId) return undefined;
        return cartItems.find((item) => item.productId === productId && item.storeId === effectiveStoreId);
    };

    return {
        cartItems,
        totalCount,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
        getItem,
    };
}
