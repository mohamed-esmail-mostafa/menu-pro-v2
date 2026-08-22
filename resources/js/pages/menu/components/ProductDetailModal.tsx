import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Plus, Minus, ShoppingBag, UtensilsCrossed } from 'lucide-react';
import useImport from '@/hooks/use-import';

interface ProductDetailModalProps {
    product: Product | null;
    currency: string;
    isOpen: boolean;
    onClose: () => void;
    isInWishlist: boolean;
    quantityInCart: number;
    onAddToCart: (product: Product, quantity: number) => void;
    onToggleWishlist: (product: Product) => void;
    handleChangeOption:any;
    selected_options:any
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
    product,
    currency,
    isOpen,
    onClose,
    isInWishlist,
    quantityInCart,
    onAddToCart,
    onToggleWishlist,
    handleChangeOption,
    selected_options
}) => {
    const { i18n,isAr } = useImport();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (isOpen) {
            setQuantity(quantityInCart > 0 ? quantityInCart : 1);
        }
    }, [isOpen, quantityInCart]);

    if (!product) return null;

    const rawPrice = Number(product.price || 0);
    const rawSalePrice =
        product.sale_price !== undefined && product.sale_price !== null && Number(product.sale_price) > 0
            ? Number(product.sale_price)
            : null;

    const unitPrice = rawSalePrice ?? rawPrice;
    const totalPrice = (unitPrice * quantity).toFixed(2);

    const handleAdd = () => {
        onAddToCart(product, quantity );
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl border border-border sm:max-w-lg">
                {/* Header Image */}
                <div className="relative w-full h-56 sm:h-64 bg-muted/40 overflow-hidden flex items-center justify-center">
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
                            <UtensilsCrossed className="w-12 h-12 stroke-1" />
                            <span className="text-xs font-medium">{isAr ? 'لا توجد صورة' : 'No Image Available'}</span>
                        </div>
                    )}

                    {/* Wishlist Floating Button */}
                    <button
                        onClick={() => onToggleWishlist(product)}
                        className={`absolute top-3 right-3 z-10 h-9 w-9 rounded-full flex items-center justify-center shadow-md transition-all ${
                            isInWishlist
                                ? 'bg-rose-500 text-white'
                                : 'bg-background/80 backdrop-blur-md text-foreground hover:bg-background'
                        }`}
                    >
                        <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* Details Section */}
                <div className="p-5 sm:p-6 space-y-4">
                    <DialogHeader className="text-left rtl:text-right space-y-1">
                        <div className="flex items-center justify-between gap-2">
                            <DialogTitle className="text-xl font-bold text-foreground">
                                {product.title}
                            </DialogTitle>
                            {product.is_featured ? (
                                <Badge className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-xs">
                                    {isAr ? 'مميز' : 'Featured'}
                                </Badge>
                            ) : null}
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 pt-1 font-mono">
                            <span className="text-xl font-black text-primary">
                                {unitPrice.toFixed(2)} <span className="text-xs font-semibold text-foreground/80">{currency}</span>
                            </span>
                            {rawSalePrice && (
                                <span className="text-xs text-muted-foreground line-through">
                                    {rawPrice.toFixed(2)} {currency}
                                </span>
                            )}
                        </div>
                    </DialogHeader>

                    {/* Description */}
                    {product.description && (
                        <div className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            {product.description}
                        </div>
                    )}


                    <div>
                        {product.attributes.map((attribute)=>(
                            <div className='mb-4'>
                              <h5 className='mb-2'>{attribute.name}</h5>
                            
                              <div className='flex items-center gap-4'>
                                {attribute.values.map((value:any)=>(
                                    <button 
                                      className={` ${selected_options[attribute.id]===value.id ? 'bg-primary text-white':'bg-gray-100'} border p-2 rounded-md flex gap-3`} onClick={()=>handleChangeOption(attribute.id , value.id)}>
                                        <p className='text-xs'> {value.value}</p>
                                        <p className='text-xs'>{value.price}{currency}</p>
                                    </button>
                                ))}
                              </div>
                            </div>
                        ))}
                    </div>

                    {/* Quantity Stepper & Add Button */}
                    <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                        {/* Stepper */}
                        <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-full p-1">
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 rounded-full hover:bg-background"
                                disabled={quantity <= 1}
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                            <span className="text-sm font-bold w-8 text-center font-mono">
                                {quantity}
                            </span>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 w-8 p-0 rounded-full hover:bg-background"
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Add Button */}
                        <Button
                            onClick={handleAdd}
                            className="flex-1 h-11 rounded-full font-bold gap-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>{isAr ? 'أضف للطلب' : 'Add to Order'}</span>
                            <span className="font-mono text-xs opacity-90">({totalPrice} {currency})</span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
