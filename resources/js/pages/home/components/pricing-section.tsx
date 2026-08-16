import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import { useTranslation } from 'react-i18next'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PricingSection() {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language?.startsWith('ar')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: t('home.pricing.starter'),
      desc: t('home.pricing.starter-desc'),
      priceMonthly: '$19',
      priceYearly: '$15',
      features: isAr
        ? ['حتى 100 صنف طعام', 'رمز QR رئيسي واحد', 'تحديث القائمة فوري', 'دعم اللغتين العربية والإنجليزية', 'دعم عبر البريد الإلكتروني']
        : ['Up to 100 Menu Items', '1 Primary QR Code', 'Real-time Updates', 'Bilingual Support (EN/AR)', 'Email Customer Support'],
      popular: false,
    },
    {
      name: t('home.pricing.pro'),
      desc: t('home.pricing.pro-desc'),
      priceMonthly: '$39',
      priceYearly: '$29',
      features: isAr
        ? ['أصناف وطاولات غير محدودة', 'رموز QR مخصصة برقم الطاولة', 'استقبال الطلبات والدفع الرقمي', 'تحليلات المبيعات وأوقات الذروة', 'تخصيص الهوية والألوان الكامل', 'دعم فني مباشر 24/7']
        : ['Unlimited Items & Tables', 'Table-Specific QR Codes', 'Smart Orders & Payments', 'Advanced Sales Analytics', 'Full Brand Theme Customization', '24/7 Priority Support'],
      popular: true,
    },
    {
      name: t('home.pricing.enterprise'),
      desc: t('home.pricing.enterprise-desc'),
      priceMonthly: '$89',
      priceYearly: '$69',
      features: isAr
        ? ['كل مميزات الخطة الاحترافية', 'إدارة فروع متعددة وسلاسل', 'ربط بنظام الكاشير (POS API)', 'مدير حساب خاص لمشروعك', 'نطاق خاص للمنيو (Custom Domain)', 'اتفاقية مستوى الخدمة SLA']
        : ['All Pro Features', 'Multi-Branch Management', 'Custom POS API Integrations', 'Dedicated Account Manager', 'Custom Domain Branding', 'SLA Uptime Guarantee'],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1 rounded-full">
            {t('home.pricing.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t('home.pricing.title')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t('home.pricing.subtitle')}
          </p>

          {/* Monthly / Yearly Switch */}
          <div className="pt-4 flex items-center justify-center">
            <div className="bg-muted p-1 rounded-full flex items-center gap-1 border border-border/60">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('home.pricing.monthly')}
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t('home.pricing.yearly')}
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 bg-card border transition-all duration-300 flex flex-col justify-between ${
                plan.popular
                  ? 'border-primary shadow-xl ring-2 ring-primary/20 scale-105 z-10'
                  : 'border-border/60 shadow-xs hover:border-border hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                  <Sparkles className="size-3" />
                  <span>{t('home.pricing.popular')}</span>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-foreground tracking-tight">
                    {billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly}
                  </span>
                  <span className="text-xs text-muted-foreground font-medium">
                    {t('home.pricing.per-month')}
                  </span>
                </div>

                <div className="pt-4 border-t border-border/60 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-foreground/80 block">
                    {t('home.pricing.features-included')}
                  </span>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5 text-xs text-foreground/90 font-medium">
                        <Check className="size-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8">
                <Button
                  asChild
                  variant={plan.popular ? 'default' : 'outline'}
                  className={`w-full rounded-2xl font-bold h-11 text-xs gap-1.5 ${
                    plan.popular ? 'shadow-md' : ''
                  }`}
                >
                  <Link href="/register">
                    <span>{t('home.pricing.select-plan')}</span>
                    <ArrowRight className="size-3.5 rtl:rotate-180" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
