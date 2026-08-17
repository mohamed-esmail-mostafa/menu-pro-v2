import React from 'react'
import useImport from '@/hooks/use-import'
import { Layers, LayoutDashboard, QrCode, Settings, ShoppingBag, Utensils } from 'lucide-react'
import { router } from '@inertiajs/react'
import AdminHeader from '@/pages/admin-dashboard/components/admin-header'

export default function AdminLayout({children}:{children:React.ReactNode}) {

  const { t } = useImport()

  const tabs = [
    { id: 'overview', label: t('store_dashboard.tab-overview'), icon: LayoutDashboard,href: "#" },
    { id: 'settings', label: t('common.settings'), icon: Settings, href: "/admin/website/setting" },
  ]
  return (
    <div className="flex h-full flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Top Header Card */}
      <AdminHeader />

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
