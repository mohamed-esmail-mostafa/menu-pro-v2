import AuthMenu from '@/components/shared/auth-menu'
import LangToggle from '@/components/shared/lang-toggle'
import Logo from '@/components/shared/logo'
import ThemeToggle from '@/components/shared/theme-toggle'


export default function AdminHeader() {
 
  return (
     <div className="p-6 rounded-3xl bg-card border border-border/70 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
                 <Logo/>    
            </div>
            <div className="flex items-center gap-3 flex-wrap">
                <LangToggle />
                <ThemeToggle />
                <AuthMenu />
            </div>
        </div>
  )
}
