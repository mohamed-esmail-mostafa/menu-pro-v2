import React from 'react';
import { Product } from '@/types/product';
import { useTranslation } from 'react-i18next';
import { Heart, Plus, Minus, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useImport from '@/hooks/use-import';
import { useCart } from '@/hooks/useCart';
import ProductFeatures from './product-card/product-features';
import WishlistIcon from './product-card/wishlist-icon';
import ProductImage from './product-card/product-image';
import ProductTitle from './product-card/product-title';
import ProductDecription from './product-card/product-decription';
import AddToCartButton from './product-card/add-to-cart-button';
import ProductQuantity from './product-card/product-quantity';
import ProductPrice from './product-card/product-price';

interface ProductCardProps {
    product: Product;
    currency: string;
    quantityInCart: number;
    isInWishlist: boolean;
    onAddToCart: (product: Product) => void;
    onUpdateQuantity: (productId: number, newQty: number) => void;
    onToggleWishlist: (product: Product) => void;
    onOpenDetails: (product: Product) => void;
    handleChangeOption:any
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
    handleChangeOption
}) => {



    const rawPrice = Number(product.price || 0);
    const rawSalePrice =
        product.sale_price !== undefined && product.sale_price !== null && Number(product.sale_price) > 0
            ? Number(product.sale_price)
            : null;

    const discountPercentage =
        rawSalePrice && rawPrice > rawSalePrice
            ? Math.round(((rawPrice - rawSalePrice) / rawPrice) * 100)
            : null;

  

    return (
        <div className="group relative flex flex-col justify-between bg-card text-card-foreground rounded-2xl border border-border/70 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            
            <div className="absolute top-2.5 left-2.5 right-2.5 z-10 flex items-center justify-between pointer-events-none">
                <ProductFeatures product={product} discountPercentage={discountPercentage} />
                <WishlistIcon product={product} onToggleWishlist={onToggleWishlist} isInWishlist={isInWishlist} />
            </div>
            <div className="cursor-pointer" onClick={() => onOpenDetails(product)}>
                <ProductImage product={product} />
                <div className="p-4 flex flex-col gap-1.5">
                   <ProductTitle product={product} />
                   <ProductDecription product={product} />
                </div>
            </div>

            <ProductPrice product={product} currency={currency} />
            {/* Card Footer: Price & Add to Cart */}
            <div className="p-4 pt-0 mt-auto flex items-center justify-between gap-2">
                {/* <ProductPrice product={product} currency={currency} /> */}
                <div>
                    {quantityInCart > 0 ? (
                        <ProductQuantity quantityInCart={quantityInCart} onUpdateQuantity={onUpdateQuantity} onAddToCart={onAddToCart} product={product} />
                    ) : (
                        <AddToCartButton onAddToCart={onAddToCart} product={product} />
                       
                    )}
                </div>
            </div>
        </div>
    );
};
