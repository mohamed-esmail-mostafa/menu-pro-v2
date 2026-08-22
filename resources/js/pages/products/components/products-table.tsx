import { Store } from '@/types/store'
import { Edit, Loader2, Plus, Star, Tag, Trash2, Utensils } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useImport from '@/hooks/use-import'
import NoDataFound from '@/components/shared/no-data-found'
import ProductCard from './product-card'
import { Product } from '@/types/product'
import { Attribute } from '@/types/attributes'

interface ProductsTableProps {
    store: Store,
    handleOpenEdit?: any,
    deletingId?: any,
    // attributes: Attribute[],
    products: Product[]
}
export default function ProductsTable({ store,products }: ProductsTableProps) {
    const { t } = useImport()
    return (
        <div>
            {(products && products.length > 0) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((productItem: Product) => (
                        <ProductCard
                            key={productItem.id}
                            productItem={productItem}
                            store={store}
                            // deletingId={deletingId}
                            // handleOpenEdit={handleOpenEdit}
                            // attributes={attributes}
                        />
                    ))}
                </div>
            ) : (
                <NoDataFound />
            )}
        </div>
    )
}
