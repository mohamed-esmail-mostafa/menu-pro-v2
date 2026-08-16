import React, { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { QrCode, Menu, ArrowRight, Sparkles } from 'lucide-react'
import ThemeToggle from '@/components/shared/theme-toggle'
import LangToggle from '@/components/shared/lang-toggle'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { auth } = usePage<{ auth?: { user?: any } }>().props
  const [scrolled, setScrolled] = useState(false)
  const isAr = i18n.language?.startsWith('ar')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#features', label: t('nav.features') },
    { href: '#how-it-works', label: t('nav.how-it-works') },
    { href: '#demo', label: t('nav.demo') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#faq', label: t('nav.faq') },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-border/60 shadow-xs py-3'
          : 'bg-background/40 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="size-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
            <div className="size-full bg-background rounded-[10px] flex items-center justify-center">
              <QrCode className="size-5 text-primary" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-primary">
              Menu<span className="text-primary">Pro</span>
            </span>
            <span className="text-[10px] leading-3 font-medium text-muted-foreground hidden sm:inline-block">
              QR Digital Menu
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-muted/40 p-1.5 rounded-full border border-border/50 backdrop-blur-xs">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-background/80 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions (Lang, Theme, Auth) */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <LangToggle />
          <ThemeToggle />

          {auth?.user ? (
            <Button asChild size="sm" className="rounded-full font-semibold px-4 gap-1.5">
              <Link href="/dashboard">
                <Sparkles className="size-3.5" />
                {t('nav.dashboard')}
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="rounded-full font-medium px-3.5">
                <Link href="/login">{t('nav.login')}</Link>
              </Button>
              <Button
                asChild
                size="sm"
                className="rounded-full font-semibold px-4 shadow-sm hover:shadow-md transition-all gap-1 bg-primary text-primary-foreground"
              >
                <Link href="/register">
                  {t('nav.register')}
                  <ArrowRight className="size-3.5 rtl:rotate-180" />
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Header Controls & Sheet Trigger */}
        <div className="flex items-center gap-1.5 md:hidden">
          <LangToggle />
          <ThemeToggle />

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-9 w-9 border-border/60 bg-background/80 backdrop-blur-sm"
                aria-label="Open navigation menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isAr ? 'left' : 'right'} className="w-[280px] sm:w-[320px] p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <SheetHeader className="p-0 text-start">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      <QrCode className="size-4" />
                    </div>
                    <span className="font-extrabold text-lg">MenuPro</span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a
                        href={link.href}
                        className="px-4 py-2.5 text-sm font-semibold text-foreground/80 hover:text-foreground hover:bg-accent rounded-xl transition-colors"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-border/60 space-y-3">
                {auth?.user ? (
                  <SheetClose asChild>
                    <Button asChild className="w-full rounded-xl font-semibold">
                      <Link href="/dashboard">{t('nav.dashboard')}</Link>
                    </Button>
                  </SheetClose>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="w-full rounded-xl font-medium">
                        <Link href="/login">{t('nav.login')}</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="w-full rounded-xl font-semibold gap-1.5">
                        <Link href="/register">
                          {t('nav.register')}
                          <ArrowRight className="size-4 rtl:rotate-180" />
                        </Link>
                      </Button>
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}


