import StoreDashboardLayout from '@/layouts/store-dashboard-layout'
import { Button } from '@/components/ui/button'
import { Link } from '@inertiajs/react'
import { Plus, Utensils } from 'lucide-react'
import { Store } from '@/types/store'
import ProductsTable from './components/products-table'
import PageHeader from '@/components/shared/page-header'
import useImport from '@/hooks/use-import'
import useSelectedStore from '@/hooks/use-selected-store'
import { Product } from '@/types/product'

export default function ProductsPage({ store, products }: { store: Store, products: Product[] }) {
    const { getCurrentStore }: any = useSelectedStore()
    const current_store = getCurrentStore() || store
    const { t } = useImport()
    const storeSlug = current_store?.slug || store?.slug

    return (
        <StoreDashboardLayout>
            <div className="space-y-6">
                {/* Top Header */}
                <PageHeader
                    icon={<Utensils className="w-6 h-6 text-primary" />}
                    title={t('store_dashboard.products.title')}
                    subtitle={t('store_dashboard.products.subtitle')}
                    count={store?.products?.length || products?.length || 0}
                >
                    <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm gap-2">
                        <Link href={`/create/product/page/${storeSlug}`}>
                            <Plus className="w-4 h-4" />
                            {t('store_dashboard.products.add-new')}
                        </Link>
                    </Button>
                </PageHeader>

                <ProductsTable
                    store={store}
                    products={products}
                />
            </div>
        </StoreDashboardLayout>
    )
}
