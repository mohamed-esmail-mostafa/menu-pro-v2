import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language || 'en'
    const isRtl = lang.startsWith('ar')
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [i18n.language])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary transition-colors duration-200">
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </div>
  )
}

