import { usePage } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { router } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    LogOut,
    Store as StoreIcon,
} from 'lucide-react';
import useAuth from '@/hooks/use-auth';
import { Button } from '../ui/button';
import useImport from '@/hooks/use-import';

export default function AuthMenu() {
    const { auth } = useAuth()
    const { t } = useImport();
    const handleLogout = () => {
        router.post('logout');
    };
    return (
        <div>
            {auth?.user ? (<DropdownMenu>
                <DropdownMenuTrigger asChild>

                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage src={auth?.user?.avatar} alt={auth.user.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                                {auth.user.name?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                            <p className="font-medium">{auth.user.name}</p>
                            <p className="w-50 truncate text-sm text-muted-foreground">
                                {auth.user.email}
                            </p>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    {/* {stores?.map((store: Store) => (
            <DropdownMenuItem asChild>
              <Link href={route('store.dashboard', store.id)}>
                <StoreIcon className="mr-2 h-4 w-4" />
                <span>{store?.name}</span>
              </Link>
            </DropdownMenuItem>
          ))} */}

                    <DropdownMenuItem asChild>
                        {/* <Link href={route('dashboard')}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>{t('header.dashboard')}</span>
            </Link> */}
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem asChild>
            <Link href={route('vendor.profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>{t('header.profile')}</span>
            </Link>
          </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{t('auth.logout')}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>) : (<>
            <Button onClick={()=>router.get('login')}>{t('auth.login')}</Button>
            </>)}
        </div>
    )
}
