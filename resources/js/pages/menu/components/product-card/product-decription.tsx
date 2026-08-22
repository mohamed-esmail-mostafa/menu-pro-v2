import { Product } from '@/types/product'
import React from 'react'

export default function ProductDecription({ product }: { product: Product }) {
  return (
    <div>
         {product.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 min-h-[32px] leading-relaxed">
                            {product.description}
                        </p>
                    )}
    </div>
  )
}
