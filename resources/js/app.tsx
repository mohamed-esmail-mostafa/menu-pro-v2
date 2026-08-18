import { createInertiaApp } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { initializeTheme } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';
import '@/i18n/index'
import StoreProvider from './context/store-provider';
import ReduxProvider from './redux/provider';


const appName = import.meta.env.VITE_APP_NAME || 'MenuPro';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return null;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <ReduxProvider>
                <TooltipProvider delayDuration={0}>
                    <StoreProvider>
                        {app}
                        <Toaster />
                    </StoreProvider>
                </TooltipProvider>
            </ReduxProvider>
        );
    },
    progress: {
        color: '#f54a00',
    },
});

// This will set light / dark mode on load...
initializeTheme();
