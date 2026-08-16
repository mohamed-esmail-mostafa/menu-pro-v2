import React from 'react'
import { useTranslation } from 'react-i18next'
import { Star, Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const { t } = useTranslation()

  const testimonials = [
    {
      quote: t('home.testimonials.t1-quote'),
      name: t('home.testimonials.t1-name'),
      role: t('home.testimonials.t1-role'),
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote: t('home.testimonials.t2-quote'),
      name: t('home.testimonials.t2-name'),
      role: t('home.testimonials.t2-role'),
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    {
      quote: t('home.testimonials.t3-quote'),
      name: t('home.testimonials.t3-name'),
      role: t('home.testimonials.t3-role'),
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-muted/20 border-y border-border/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1 rounded-full">
            {t('home.testimonials.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {t('home.testimonials.title')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            {t('home.testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-card border border-border/60 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-6 relative"
            >
              <Quote className="size-8 text-primary/20 absolute top-6 right-6 rtl:left-6 rtl:right-auto" />
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="size-11 rounded-full object-cover border border-border"
                />
                <div>
                  <h4 className="font-bold text-sm text-foreground">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
