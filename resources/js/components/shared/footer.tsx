import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { QrCode, Send, Heart, Shield, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LangToggle from '@/components/shared/lang-toggle'
import ThemeToggle from '@/components/shared/theme-toggle'

export default function Footer() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <footer className="border-t border-border/60 bg-muted/20 pt-16 pb-12 relative overflow-hidden">
      {/* Glow effect background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border/50">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="size-10 rounded-xl bg-gradient-to-tr from-primary to-emerald-500 p-0.5 shadow-md">
                <div className="size-full bg-background rounded-[10px] flex items-center justify-center">
                  <QrCode className="size-5 text-primary" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-primary">
                Menu<span className="text-primary">Pro</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {t('footer.tagline')}
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground/80 block">
                {t('footer.newsletter-title')}
              </span>
              <p className="text-xs text-muted-foreground">
                {t('footer.newsletter-desc')}
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="size-4" />
                  <span>{t('common.success')}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <Input
                    type="email"
                    placeholder={t('footer.email-placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-xl bg-background/80 border-border/80 text-xs h-10"
                  />
                  <Button type="submit" size="sm" className="rounded-xl px-4 font-medium gap-1 text-xs shrink-0">
                    <span>{t('footer.subscribe')}</span>
                    <Send className="size-3.5 rtl:rotate-180" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t('footer.quick-links')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.features')}
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.how-it-works')}
                </a>
              </li>
              <li>
                <a href="#demo" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.demo')}
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.pricing')}
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t('footer.solutions')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-muted-foreground">{t('footer.restaurants')}</li>
              <li className="text-muted-foreground">{t('footer.food-trucks')}</li>
              <li className="text-muted-foreground">{t('footer.stores')}</li>
              <li className="text-muted-foreground">{t('footer.hotels')}</li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              {t('footer.company')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} MenuPro. {t('footer.rights')}</p>
          <div className="flex items-center gap-3">
            <LangToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}

