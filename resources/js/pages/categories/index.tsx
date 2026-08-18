import { Button } from '@/components/ui/button'
import useImport from '@/hooks/use-import'
import StoreDashboardLayout from '@/layouts/store-dashboard-layout'
import { Store } from '@/types/store'
import {Layers } from 'lucide-react'
import useSelectedStore from '@/hooks/use-selected-store'
import { Category } from '@/types/category'
import { useState, useMemo } from 'react'
import { router } from '@inertiajs/react'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import StoreCategories from './store-categories'
import CategoriesSheet from './categories-sheet'

export default function CategoriesPage({ store, categories = [] }: { store: Store, categories: Category[] }) {
    const { t, isAr } = useImport()
    const {  getCurrentStore }: any = useSelectedStore()
    const currentStore = store || getCurrentStore()

    const [searchQuery, setSearchQuery] = useState('')
    const [assigningId, setAssigningId] = useState<any>(null)

    // Filter categories to show ONLY categories not selected by store
    const unassignedCategories = useMemo(() => {
        if (!categories) return []
        const attachedIds = new Set(store?.categories?.map((c: any) => c.id) || [])
        return categories.filter((cat) => !attachedIds.has(cat.id))
    }, [categories, store?.categories])

    // Filter unassigned categories based on search input
    const filteredUnassignedCategories = useMemo(() => {
        if (!searchQuery.trim()) return unassignedCategories
        const query = searchQuery.toLowerCase()
        return unassignedCategories.filter((cat) => {
            const name = ( cat.name || '').toLowerCase()
            return name.includes(query)
        })
    }, [unassignedCategories, searchQuery])

    const handleAssignCategory = (id: any) => {
        setAssigningId(id)
        router.post(
            '/assign/category/store',
            {
                store_id: currentStore.id,
                category_id: id,
            },
            {
                onSuccess: () => {
                    toast.success(t("store_dashboard.categories.assign-success") || (isAr ? 'تم إضافة القسم للمتجر بنجاح' : 'Category assigned to store successfully'))
                },
                onFinish: () => {
                    setAssigningId(null)
                },
            }
        )
    }

    return (
        <StoreDashboardLayout>
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b">
                    <div>
                        <div className="flex items-center gap-2">
                            <Layers className="w-6 h-6 text-primary" />
                            <h1 className="text-2xl font-bold tracking-tight">
                                {t("store_dashboard.categories.title")}
                            </h1>
                            <Badge variant="outline" className="ml-2 font-mono">
                                {store?.categories?.length || 0}
                            </Badge>
                        </div>

                    </div>

                    <CategoriesSheet
                        unassignedCategories={unassignedCategories}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filteredUnassignedCategories={filteredUnassignedCategories}
                        assigningId={assigningId}
                        handleAssignCategory={handleAssignCategory}
                    />
                </div>


                <StoreCategories store={store} />
            </div>
        </StoreDashboardLayout>
    )
}
