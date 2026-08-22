import useImport from '@/hooks/use-import'
import { Product } from '@/types/product'
import { UtensilsCrossed } from 'lucide-react'
import React from 'react'

export default function ProductImage({ product }: { product: Product }) {
    const { isAr } = useImport()
    return (
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
    )
}
