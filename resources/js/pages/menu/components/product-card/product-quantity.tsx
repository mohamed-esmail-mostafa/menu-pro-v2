import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import React from 'react'

export default function ProductQuantity({ quantityInCart, onUpdateQuantity, onAddToCart, product }: any) {
    return (
        <div className="flex items-center gap-1 bg-primary text-white border border-primary/20 rounded-full p-1 shadow-2xs">
            <Button
                size="sm"
                variant="ghost"
                className="h-5 w-5 p-0 rounded-full hover:bg-primary/20 text-white"
                onClick={(e) => {
                    e.stopPropagation();
                    onUpdateQuantity(product.id, quantityInCart - 1);
                }}
            >
                <Minus className="w-3.5 h-3.5" />
            </Button>
            <span className="text-xs font-black min-w-[18px] text-center text-white font-mono">
                {quantityInCart}
            </span>
            <Button
                size="sm"
                variant="ghost"
                className="h-5 w-5 p-0 rounded-full hover:bg-primary/20 text-white"
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                }}
            >
                <Plus className="w-3.5 h-3.5" />
            </Button>
        </div>
    )
}
