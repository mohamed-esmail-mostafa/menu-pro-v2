import React from 'react'
import { useTranslation } from 'react-i18next'
import { Store, QrCode, TrendingUp, Smile } from 'lucide-react'

export default function StatsSection() {
  const { t } = useTranslation()

  const stats = [
    {
      icon: Store,
      value: '10,000+',
      label: t('home.stats.stores'),
      color: 'from-blue-500/20 to-indigo-500/20 text-indigo-500',
    },
    {
      icon: QrCode,
      value: '5,000,000+',
      label: t('home.stats.scans'),
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-500',
    },
    {
      icon: TrendingUp,
      value: '+35%',
      label: t('home.stats.sales-increase'),
      color: 'from-amber-500/20 to-orange-500/20 text-amber-500',
    },
    {
      icon: Smile,
      value: '99.9%',
      label: t('home.stats.satisfaction'),
      color: 'from-purple-500/20 to-pink-500/20 text-purple-500',
    },
  ]

  return (
    <section className="py-12 border-y border-border/50 bg-muted/10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border/60 shadow-xs hover:shadow-md transition-all text-center space-y-2 group"
              >
                <div className={`size-12 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="size-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
