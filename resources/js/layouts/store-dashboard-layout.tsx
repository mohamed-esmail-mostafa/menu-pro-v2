
import useImport from '@/hooks/use-import'
import { Layers, LayoutDashboard, QrCode, Settings, ShoppingBag, Utensils } from 'lucide-react';
import Header from '@/pages/store-dashboard/components/header';
import { router } from '@inertiajs/react';
import React from 'react';
import useSelectedStore from '@/hooks/use-selected-store';
import TabSection from '@/pages/store-dashboard/components/tab-section';

export default function StoreDashboardLayout({ children }: { children: React.ReactNode }) {
    const { t } = useImport();
    
    
    return (
        <div className="flex h-full flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {/* Top Header Card */}
            <Header />

            {/* Navigation Tabs Bar */}
            <TabSection />

            {/* Tab Contents */}
            {children}
        </div>
    )
}
