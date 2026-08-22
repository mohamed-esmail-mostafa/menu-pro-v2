import { Product } from '@/types/product';
import React from 'react'

export default function useProductPrice({product}:{product: Product}) {
   const product_price = (product: Product) => {
          if (product.is_simple === true) {
              if (product.sale_price) {
                  return {
                      type: "sale",
                      price: product.price,
                      sale_price: product.sale_price
                  }
              } else {
                  return {
                      type: "normal",
                      price: product.price,
                  }
  
              }
          } else {
              const prices = product.attributes.flatMap(attribute => attribute.values.map(item => Number(item.price)));
              const minPrice = Math.min(...prices)
              const maxPrice = Math.max(...prices)
              return {
                  type: "range",
                  min: minPrice,
                  max: maxPrice,
              }
          }
      }
  
    return {
        product_price
    }
}
