import React from 'react';
import type { AuthLayoutProps } from '@/types';
import Logo from '@/components/shared/logo';
import LangToggle from '@/components/shared/lang-toggle';
import ThemeToggle from '@/components/shared/theme-toggle';
import useImport from '@/hooks/use-import';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { t, isAr } = useImport();

    const translatedTitle = title ? (t(title) !== title ? t(title) : title) : '';
    const translatedDescription = description ? (t(description) !== description ? t(description) : description) : '';

    return (
        <div className="min-h-screen bg-muted/20 dark:bg-background flex flex-col justify-between p-4 sm:p-6" dir={isAr ? 'rtl' : 'ltr'}>
            {/* Header with Logo and Toggles */}
            <header className="w-full max-w-4xl mx-auto flex items-center justify-between py-2">
                <Logo />
                <div className="flex items-center gap-2">
                    <LangToggle />
                    <ThemeToggle />
                </div>
            </header>

            {/* Simple Centered Card */}
            <main className="flex-1 flex items-center justify-center py-8">
                <div className="w-full max-w-md bg-card border border-border/70 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
                    {(translatedTitle || translatedDescription) && (
                        <div className="space-y-1 text-center">
                            {translatedTitle && (
                                <h1 className="text-xl font-bold text-foreground">
                                    {translatedTitle}
                                </h1>
                            )}
                            {translatedDescription && (
                                <p className="text-sm text-muted-foreground">
                                    {translatedDescription}
                                </p>
                            )}
                        </div>
                    )}

                    {children}
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="text-center text-xs text-muted-foreground py-2">
                &copy; {new Date().getFullYear()} MenuPro
            </footer>
        </div>
    );
}
