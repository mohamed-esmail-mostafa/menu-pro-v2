import AuthMenu from '@/components/shared/auth-menu'
import LangToggle from '@/components/shared/lang-toggle'
import ThemeToggle from '@/components/shared/theme-toggle'
import useImport from '@/hooks/use-import'
import React from 'react'

export default function AdminHeader() {
  const {t}=useImport()
  return (
     <div className="p-6 rounded-3xl bg-card border border-border/70 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-gradient-to-tr from-primary to-emerald-500 p-0.5 shadow-md shrink-0">
                    <div className="size-full bg-background rounded-[14px] flex items-center justify-center font-black text-xl text-primary">
                       fsdf
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                            {/* {store.name} */}
                        </h1>
                      
                    </div>
                   
                </div>
            </div>

            {/* Controls Right */}
            <div className="flex items-center gap-3 flex-wrap">
                {/* Store Operational Status Selector */}
               

                <LangToggle />
                <ThemeToggle />
                <AuthMenu />
            </div>
        </div>
  )
}
