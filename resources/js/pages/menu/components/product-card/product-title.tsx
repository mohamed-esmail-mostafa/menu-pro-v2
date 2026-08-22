import { Product } from '@/types/product'
import React from 'react'

export default function ProductTitle({ product }: { product: Product }) {
    return (
        <h3 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.title}
        </h3>
    )
}
