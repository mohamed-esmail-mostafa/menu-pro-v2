import useProductPrice from '@/hooks/use-product-price'
import { Product } from '@/types/product'
import React from 'react'

export default function ProductPrice({ product, currency }: { product: Product, currency: any }) {
    const { product_price } = useProductPrice({ product })
    const price = product_price(product)

    return (
        <div className=' px-3 mb-3'>
            {price.type === "sale" && (
                <div className='flex items-center gap-3'>
                    <span className='line-through text-red-600 text-xs'>{price.price}{currency}</span> -
                    <span>{price.sale_price} {currency}</span>
                </div>
            )}

            {price.type === "normal" && (
                <div>
                    <span className='text-sm'>{price.price} {currency}</span>
                </div>
            )}


            {price.type === "range" && (
                <div className='flex items-center gap-3'>
                    <span>{price.min} {currency}</span>
                    <span>{price.max} {currency}</span>
                </div>
            )}
        </div>
    )
}
