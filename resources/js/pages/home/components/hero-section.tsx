import React from 'react'
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, QrCode, Sparkles, Smartphone, CheckCircle2, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-28">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/20 to-emerald-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500">
              <Sparkles className="size-3.5 text-primary" />
              <span>{t('home.badge')}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.15]">
              {t('home.hero-title')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('home.hero-subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto rounded-full font-bold px-8 h-12 text-sm sm:text-base shadow-lg hover:shadow-primary/25 transition-all gap-2 bg-primary text-primary-foreground"
              >
                <Link href="/register/store/page">
                  <span>{t('home.get-started')}</span>
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full font-semibold px-7 h-12 text-sm sm:text-base border-border/80 hover:bg-accent backdrop-blur-sm gap-2"
              >
                <a href="#demo">
                  <QrCode className="size-4 text-primary" />
                  <span>{t('home.try-demo')}</span>
                </a>
              </Button>
            </div>

            {/* Trust Note */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" />
                {t('home.no-credit-card')}
              </span>
            </div>
          </div>

          {/* Right Column: Visual QR Phone Showcase Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Phone Container Mockup */}
            <div className="relative w-full max-w-[340px] rounded-[40px] border-[8px] border-slate-900 dark:border-slate-800 bg-background shadow-2xl p-4 overflow-hidden transform hover:-rotate-1 transition-transform duration-500">
              {/* Top Notch / Camera bar */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 dark:bg-slate-800 rounded-full z-20" />

              {/* Simulated Digital Menu Header */}
              <div className="pt-5 pb-3 text-center border-b border-border/60">
                <div className="size-12 mx-auto rounded-full bg-gradient-to-tr from-amber-500 to-red-500 p-0.5 shadow-md mb-2">
                  <div className="size-full bg-background rounded-full flex items-center justify-center text-xs font-bold">
                    🍔
                  </div>
                </div>
                <h3 className="font-bold text-sm text-foreground">Burger Lounge</h3>
                <span className="text-[10px] text-muted-foreground">Table #04 • Digital Menu</span>
              </div>

              {/* Simulated QR Code Scan Floating Card */}
              <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-emerald-500/5 to-primary/5 border border-primary/20 text-center space-y-2">
                <div className="size-28 mx-auto bg-white p-2 rounded-xl shadow-md border border-slate-200 flex items-center justify-center">
                  <QrCode className="size-20 text-slate-900" />
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  <Zap className="size-3" /> Scan & Order Instantly
                </div>
              </div>

              {/* Mini Item List Preview */}
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-accent/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🍔</span>
                    <div>
                      <div className="font-bold text-foreground">Truffle Burger</div>
                      <div className="text-[10px] text-muted-foreground">$12.50</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-md">
                    + Add
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-accent/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🥤</span>
                    <div>
                      <div className="font-bold text-foreground">Fresh Mojito</div>
                      <div className="text-[10px] text-muted-foreground">$4.99</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-md">
                    + Add
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Badge overlay */}
            <div className="absolute -bottom-4 -left-4 sm:left-0 bg-background/90 backdrop-blur-md p-3.5 rounded-2xl border border-border shadow-xl flex items-center gap-3 animate-bounce-slow">
              <div className="size-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold">
                <Star className="size-5 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">4.9 / 5.0 Rating</div>
                <div className="text-[10px] text-muted-foreground">From 10,000+ Stores</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
