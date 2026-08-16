import React from 'react'
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, QrCode, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CtaSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-emerald-600 p-8 sm:p-12 md:p-16 text-primary-foreground shadow-2xl overflow-hidden">
          {/* Background Glow Overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="size-16 mx-auto rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <QrCode className="size-8 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              {t('home.cta.title')}
            </h2>

            <p className="text-primary-foreground/80 text-sm sm:text-base max-w-xl mx-auto font-medium">
              {t('home.cta.subtitle')}
            </p>

            <div className="pt-4 flex justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-slate-900 hover:bg-slate-100 font-bold px-8 h-12 text-sm sm:text-base shadow-lg gap-2"
              >
                <Link href="/register">
                  <span>{t('home.cta.button')}</span>
                  <ArrowRight className="size-4 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
