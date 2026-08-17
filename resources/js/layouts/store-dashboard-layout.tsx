
import useImport from '@/hooks/use-import'
import { Layers, LayoutDashboard, QrCode, Settings, ShoppingBag, Utensils } from 'lucide-react';
import Header from '@/pages/store-dashboard/components/header';
import { router } from '@inertiajs/react';
import React from 'react';
import useSelectedStore from '@/hooks/use-selected-store';

export default function StoreDashboardLayout({ children }: { children: React.ReactNode }) {
    const { t } = useImport();
     const {  getCurrentStore }: any = useSelectedStore();
     const store  = getCurrentStore()
    const tabs = [
        { id: 'overview', label: t('store_dashboard.tab-overview'), icon: LayoutDashboard },
        { id: 'categories', label: t('store_dashboard.tab-categories'), icon: Layers, href: `/categories/page/${store?.slug}` },
        { id: 'meals', label: t('store_dashboard.tab-meals'), icon: Utensils, href: `/store/products/page/${store?.slug}` },
        { id: 'orders', label: t('store_dashboard.tab-orders'), icon: ShoppingBag, href: "/store/categories/{storeId?}" },
        { id: 'qr', label: t('store_dashboard.tab-qr'), icon: QrCode, href: `/store/tables/page/${store?.slug}` },
        { id: 'settings', label: t('store_dashboard.tab-settings'), icon: Settings, href: "/store/categories/{storeId?}" },
    ]
    return (
        <div className="flex h-full flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {/* Top Header Card */}
            <Header />

            {/* Navigation Tabs Bar */}
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

            {/* Tab Contents */}
            {children}
        </div>
    )
}
