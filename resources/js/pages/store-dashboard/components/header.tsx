import React from 'react'
import { Badge } from '@/components/ui/badge'
import LangToggle from '@/components/shared/lang-toggle';
import ThemeToggle from '@/components/shared/theme-toggle';
import AuthMenu from '@/components/shared/auth-menu';
import useImport from '@/hooks/use-import';
import useSelectedStore from '@/hooks/use-selected-store';

export default function Header() {
    const { t } = useImport();
    const { getCurrentStore }: any = useSelectedStore();
    const store = getCurrentStore()
    return (
        <div className="p-6 rounded-3xl bg-card border border-border/70 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-gradient-to-tr from-primary to-emerald-500 p-0.5 shadow-md shrink-0">
                    <div className="size-full bg-background rounded-[14px] flex items-center justify-center font-black text-xl text-primary overflow-hidden">
                        <img src={store.image} />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                            {store.name}
                        </h1>
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 font-bold">
                            Verified Store ✓
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {t('store_dashboard.subtitle')}
                    </p>
                </div>
            </div>

            {/* Controls Right */}
            <div className="flex items-center gap-3 flex-wrap">
                {/* Store Operational Status Selector */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-muted border border-border text-xs font-semibold">
                    <button
                        // onClick={() => setStoreStatus('open')}
                        className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 `}
                    >
                        <span className="size-2 rounded-full bg-white animate-pulse" />
                        <span>{t('store_dashboard.status-open')}</span>
                    </button>
                    <button
                        // onClick={() => setStoreStatus('busy')}
                        className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 `}
                    >
                        <span>{t('store_dashboard.status-busy')}</span>
                    </button>
                    <button
                        // onClick={() => setStoreStatus('closed')}
                        className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 `}
                    >
                        <span>{t('store_dashboard.status-closed')}</span>
                    </button>
                </div>

                <LangToggle />
                <ThemeToggle />
                <AuthMenu />
            </div>
        </div>
    )
}
