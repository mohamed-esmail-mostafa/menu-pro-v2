import React from 'react'
import { useTranslation } from 'react-i18next'
import { UserPlus, QrCode, Store, UtensilsCrossed } from 'lucide-react'

export default function HowItWorksSection() {
  const { t } = useTranslation()

  const steps = [
    {
      num: '01',
      icon: UserPlus,
      title: t('home.how-it-works.step1-title'),
      desc: t('home.how-it-works.step1-desc'),
    },
    {
      num: '02',
      icon: QrCode,
      title: t('home.how-it-works.step2-title'),
      desc: t('home.how-it-works.step2-desc'),
    },
    {
      num: '03',
      icon: Store,
      title: t('home.how-it-works.step3-title'),
      desc: t('home.how-it-works.step3-desc'),
    },
    {
      num: '04',
      icon: UtensilsCrossed,
      title: t('home.how-it-works.step4-title'),
      desc: t('home.how-it-works.step4-desc'),
    },
  ]

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/20 border-y border-border/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full">
            {t('home.how-it-works.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t('home.how-it-works.title')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t('home.how-it-works.subtitle')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="relative p-6 rounded-3xl bg-card border border-border/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                      <Icon className="size-6" />
                    </div>
                    <span className="text-3xl font-black text-muted-foreground/30">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
