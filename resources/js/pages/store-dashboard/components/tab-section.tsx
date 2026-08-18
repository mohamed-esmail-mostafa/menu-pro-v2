import useImport from '@/hooks/use-import'
import useSelectedStore from '@/hooks/use-selected-store';
import { store } from '@/routes/country';
import { router } from '@inertiajs/react';
import { Layers, LayoutDashboard, QrCode, Settings, ShoppingBag, Utensils } from 'lucide-react';


export default function TabSection() {
    const { t } = useImport();
     const {  getCurrentStore }: any = useSelectedStore();
     const store  = getCurrentStore()
    const tabs = [
        { id: 'overview', label: t('store_dashboard.tab-overview'), icon: LayoutDashboard , href:`/store/dashboard/${store?.slug}` },
        { id: 'categories', label: t('store_dashboard.tab-categories'), icon: Layers, href: `/categories/page/${store?.slug}` },
        { id: 'meals', label: t('store_dashboard.tab-meals'), icon: Utensils, href: `/store/products/page/${store?.slug}` },
        { id: 'orders', label: t('store_dashboard.tab-orders'), icon: ShoppingBag, href: `/orders/store/page/${store?.slug}` },
        { id: 'qr', label: t('store_dashboard.tab-qr'), icon: QrCode, href: `/store/tables/page/${store?.slug}` },
        { id: 'settings', label: t('store_dashboard.tab-settings'), icon: Settings, href: `/store/update/page/${store?.slug}` },
    ]
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-border/60 scrollbar-none">
            {tabs.map((tb) => {
                const Icon = tb.icon

                return (
                    <button
                        key={tb.id}
                        onClick={() => router.get(`${tb.href}`)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border }`}
                    >
                        <Icon className="size-4" />
                        <span>{tb.label}</span>

                    </button>
                )
            })}
        </div>
    )
}
