import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    toggleWishlist as toggleWishlistAction,
    removeFromWishlist as removeFromWishlistAction,
    clearWishlist as clearWishlistAction,
    WishlistItem,
} from '@/redux/slices/wishlistSlice';
import { Product } from '@/types/product';
import { toast } from 'sonner';

export function useWishlist(storeId?: number) {
    const dispatch = useAppDispatch();
    const allItems = useAppSelector((state) => state.wishlist.items);

    const wishlistItems = useMemo(() => {
        if (!storeId) return allItems;
        return allItems.filter((item) => item.storeId === storeId);
    }, [allItems, storeId]);

    const totalCount = useMemo(() => wishlistItems.length, [wishlistItems]);

    const isInWishlist = (productId: number, targetStoreId?: number): boolean => {
        const effectiveStoreId = targetStoreId || storeId;
        if (!effectiveStoreId) return false;
        return wishlistItems.some((item) => item.productId === productId && item.storeId === effectiveStoreId);
    };

    const toggleWishlist = (product: Product, targetStoreId?: number, showToast: boolean = true) => {
        const effectiveStoreId = targetStoreId || storeId || product.store_id;
        if (!effectiveStoreId) {
            toast.error('Store ID is required for wishlist');
            return;
        }
        const alreadyIn = isInWishlist(product.id, effectiveStoreId);
        dispatch(toggleWishlistAction({ product, storeId: effectiveStoreId }));

        if (showToast) {
            if (alreadyIn) {
                toast.info(`Removed ${product.title} from wishlist`);
            } else {
                toast.success(`Added ${product.title} to wishlist`);
            }
        }
    };

    const removeFromWishlist = (productId: number, targetStoreId?: number) => {
        const effectiveStoreId = targetStoreId || storeId;
        if (!effectiveStoreId) return;
        dispatch(removeFromWishlistAction({ productId, storeId: effectiveStoreId }));
        toast.info('Item removed from wishlist');
    };

    const clearWishlist = (targetStoreId?: number) => {
        const effectiveStoreId = targetStoreId || storeId;
        if (effectiveStoreId) {
            dispatch(clearWishlistAction({ storeId: effectiveStoreId }));
        }
        toast.info('Wishlist cleared');
    };

    return {
        wishlistItems,
        totalCount,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
    };
}
