import React from 'react';
import { Product } from '@/types/product';
import { useTranslation } from 'react-i18next';
import { Heart, Plus, Minus, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
    product: Product;
    currency: string;
    quantityInCart: number;
    isInWishlist: boolean;
    onAddToCart: (product: Product) => void;
    onUpdateQuantity: (productId: number, newQty: number) => void;
    onToggleWishlist: (product: Product) => void;
    onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    currency,
    quantityInCart,
    isInWishlist,
    onAddToCart,
    onUpdateQuantity,
    onToggleWishlist,
    onOpenDetails,
}) => {
    const { i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    const rawPrice = Number(product.price || 0);
    const rawSalePrice =
        product.sale_price !== undefined && product.sale_price !== null && Number(product.sale_price) > 0
            ? Number(product.sale_price)
            : null;

    const discountPercentage =
        rawSalePrice && rawPrice > rawSalePrice
            ? Math.round(((rawPrice - rawSalePrice) / rawPrice) * 100)
            : null;

    const currentPrice = rawSalePrice ?? rawPrice;

    return (
        <div className="group relative flex flex-col justify-between bg-card text-card-foreground rounded-2xl border border-border/70 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            {/* Top Badges & Wishlist */}
            <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
                <div className="flex flex-col gap-1 items-start pointer-events-auto">
                    {discountPercentage && (
                        <Badge className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                            {isAr ? `خصم ${discountPercentage}%` : `${discountPercentage}% OFF`}
                        </Badge>
                    )}
                    {product.is_featured ? (
                        <Badge variant="secondary" className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>{isAr ? 'مميز' : 'Featured'}</span>
                        </Badge>
                    ) : null}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product);
                    }}
                    className={`pointer-events-auto h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs border ${
                        isInWishlist
                            ? 'bg-rose-500 text-white border-rose-500 scale-110'
                            : 'bg-background/80 backdrop-blur-xs text-muted-foreground border-border/60 hover:text-rose-500 hover:bg-background'
                    }`}
                    title={isAr ? 'حفظ في المفضلة' : 'Toggle wishlist'}
                >
                    <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Clickable Card Body */}
            <div className="cursor-pointer" onClick={() => onOpenDetails(product)}>
                {/* Product Image / Placeholder */}
                <div className="relative w-full aspect-4/3 bg-muted/30 overflow-hidden flex items-center justify-center">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
                            <UtensilsCrossed className="w-10 h-10 stroke-1" />
                            <span className="text-[11px] font-medium tracking-wide">
                                {isAr ? 'لا توجد صورة' : 'No Image'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Product Content */}
                <div className="p-4 flex flex-col gap-1.5">
                    <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {product.title}
                    </h3>

                    {product.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px] leading-relaxed">
                            {product.description}
                        </p>
                    )}
                </div>
            </div>

            {/* Card Footer: Price & Add to Cart */}
            <div className="p-4 pt-0 mt-auto flex items-center justify-between gap-2">
                {/* Price Display */}
                <div className="flex flex-col">
                    {rawSalePrice && (
                        <span className="text-[11px] text-muted-foreground line-through font-mono">
                            {rawPrice.toFixed(2)} {currency}
                        </span>
                    )}
                    <span className="text-base font-black text-primary font-mono tracking-tight">
                        {currentPrice.toFixed(2)} <span className="text-xs font-semibold text-foreground/80">{currency}</span>
                    </span>
                </div>

                {/* Cart Action */}
                <div>
                    {quantityInCart > 0 ? (
                        <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full p-1 shadow-2xs">
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 rounded-full hover:bg-primary/20 text-primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onUpdateQuantity(product.id, quantityInCart - 1);
                                }}
                            >
                                <Minus className="w-3.5 h-3.5" />
                            </Button>
                            <span className="text-xs font-black min-w-[18px] text-center text-primary font-mono">
                                {quantityInCart}
                            </span>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 w-7 p-0 rounded-full hover:bg-primary/20 text-primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddToCart(product);
                                }}
                            >
                                <Plus className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    ) : (
                        <Button
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                onAddToCart(product);
                            }}
                            className="h-8 px-3 rounded-full text-xs font-bold gap-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs transition-all active:scale-95"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{isAr ? 'أضف' : 'Add'}</span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
