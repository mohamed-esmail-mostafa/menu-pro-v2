import React from 'react'
import { Badge } from '@/components/ui/badge'
import useImport from '@/hooks/use-import'
import { Product } from '@/types/product'
import { Sparkles } from 'lucide-react'

export default function ProductFeatures({ product, discountPercentage }: { product: Product, discountPercentage: any }) {
    const { t } = useImport()
    return (
        <div className="flex flex-col gap-1 items-start pointer-events-auto">
            {discountPercentage && (
                <Badge className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-xs">
                    {/* {isAr ? `خصم ${discountPercentage}%` : `${discountPercentage}% OFF`} */}
                    {`${discountPercentage}%`} {t("common.discount")}
                </Badge>
            )}
            {product.is_featured ? (
                <Badge variant="secondary" className="bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>
                        {/* {isAr ? 'مميز' : 'Featured'} */}


                        {t('common.featured')}
                    </span>
                </Badge>
            ) : null}
        </div>
    )
}
