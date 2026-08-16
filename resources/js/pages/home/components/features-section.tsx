import React from 'react'
import { useTranslation } from 'react-i18next'
import { QrCode, RefreshCw, Globe, ShoppingBag, Palette, BarChart3 } from 'lucide-react'

export default function FeaturesSection() {
  const { t } = useTranslation()

  const features = [
    {
      icon: QrCode,
      title: t('home.features.f1-title'),
      description: t('home.features.f1-desc'),
      gradient: 'from-blue-500/10 to-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    },
    {
      icon: RefreshCw,
      title: t('home.features.f2-title'),
      description: t('home.features.f2-desc'),
      gradient: 'from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: Globe,
      title: t('home.features.f3-title'),
      description: t('home.features.f3-desc'),
      gradient: 'from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      icon: ShoppingBag,
      title: t('home.features.f4-title'),
      description: t('home.features.f4-desc'),
      gradient: 'from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400',
    },
    {
      icon: Palette,
      title: t('home.features.f5-title'),
      description: t('home.features.f5-desc'),
      gradient: 'from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400',
    },
    {
      icon: BarChart3,
      title: t('home.features.f6-title'),
      description: t('home.features.f6-desc'),
      gradient: 'from-cyan-500/10 to-blue-500/10 text-cyan-600 dark:text-cyan-400',
    },
  ]

  return (
    <section id="features" className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1 rounded-full">
            {t('home.features.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t('home.features.title')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t('home.features.subtitle')}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative p-8 rounded-3xl bg-card border border-border/60 hover:border-primary/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`size-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="size-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
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
