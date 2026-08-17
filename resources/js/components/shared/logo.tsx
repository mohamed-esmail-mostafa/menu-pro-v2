import React, { useImperativeHandle } from 'react'
import { Link } from '@inertiajs/react'
import useWebsiteSetting from '@/hooks/use-website-setting'
import useImport from '@/hooks/use-import';

export default function Logo() {
    const { settings } = useWebsiteSetting();
    const { t, dark ,isAr} = useImport()
    return (
        <Link href="/" className="flex items-center gap-2.5 group">
            <div className="size-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <div className="size-full bg-background rounded-[10px] flex items-center justify-center">
                    <img src={dark ? settings?.light_logo : settings?.dark_logo} alt="" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-primary">
                    {isAr ? settings.name_ar : settings.name_en}
                </span>
                <span className="text-[10px] leading-3 font-medium text-muted-foreground hidden sm:inline-block">
                    
                    {t('common.logo-slogn')}
                </span>
            </div>
        </Link>

    )
}
