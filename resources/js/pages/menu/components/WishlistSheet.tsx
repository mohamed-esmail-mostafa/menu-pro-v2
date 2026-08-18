import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { WishlistItem } from '@/redux/slices/wishlistSlice';
import { Product } from '@/types/product';
import { Heart, ShoppingBag, Trash2, Utensils } from 'lucide-react';

interface WishlistSheetProps {
    isOpen: boolean;
    onClose: () => void;
    items: WishlistItem[];
    currency: string;
    onRemoveItem: (productId: number) => void;
    onClearWishlist: () => void;
    onAddToCart: (product: Product) => void;
}

export const WishlistSheet: React.FC<WishlistSheetProps> = ({
    isOpen,
    onClose,
    items,
    currency,
    onRemoveItem,
    onClearWishlist,
    onAddToCart,
}) => {
    const { i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    return (
        <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full bg-background border-border">
                {/* Header */}
                <SheetHeader className="p-4 sm:p-5 border-b border-border text-left rtl:text-right flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
                        <SheetTitle className="text-lg font-bold text-foreground">
                            {isAr ? 'الأطباق المفضلة' : 'Wishlist'}
                        </SheetTitle>
                        <span className="bg-rose-500/10 text-rose-500 text-xs font-bold px-2 py-0.5 rounded-full">
                            {items.length}
                        </span>
                    </div>

                    {items.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearWishlist}
                            className="text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 gap-1 h-8 px-2"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{isAr ? 'مسح الكل' : 'Clear All'}</span>
                        </Button>
                    )}
                </SheetHeader>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-muted-foreground">
                            <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
                                <Heart className="w-8 h-8 opacity-60" />
                            </div>
                            <h4 className="font-bold text-foreground text-base">
                                {isAr ? 'المفضلة فارغة' : 'Your wishlist is empty'}
                            </h4>
                            <p className="text-xs max-w-xs leading-relaxed">
                                {isAr
                                    ? 'اضغط على رمز القلب على أي وجبة للحفظ في قائمة مفضلاتك.'
                                    : 'Tap the heart icon on any product to save it here for later.'}
                            </p>
                        </div>
                    ) : (
                        items.map((item) => {
                            const rawPrice = Number(item.product.price || 0);
                            const rawSalePrice =
                                item.product.sale_price !== undefined &&
                                item.product.sale_price !== null &&
                                Number(item.product.sale_price) > 0
                                    ? Number(item.product.sale_price)
                                    : null;
                            const currentPrice = rawSalePrice ?? rawPrice;

                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/60 shadow-2xs"
                                >
                                    {/* Thumbnail */}
                                    <div className="h-14 w-14 rounded-lg bg-muted/40 overflow-hidden flex-shrink-0 flex items-center justify-center">
                                        {item.product.image ? (
                                            <img
                                                src={item.product.image}
                                                alt={item.product.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Utensils className="w-6 h-6 text-muted-foreground/40" />
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-xs font-bold text-foreground line-clamp-1">
                                            {item.product.title}
                                        </h4>
                                        <p className="text-xs text-primary font-bold font-mono mt-0.5">
                                            {currentPrice.toFixed(2)} {currency}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1.5">
                                        <Button
                                            size="sm"
                                            onClick={() => onAddToCart(item.product)}
                                            className="h-8 px-2.5 rounded-full text-xs font-bold gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
                                        >
                                            <ShoppingBag className="w-3.5 h-3.5" />
                                            <span className="hidden sm:inline">
                                                {isAr ? 'أضف' : 'Add'}
                                            </span>
                                        </Button>

                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => onRemoveItem(item.productId)}
                                            className="h-8 w-8 p-0 rounded-full text-muted-foreground hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};
