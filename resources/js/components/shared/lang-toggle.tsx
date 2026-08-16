import React from 'react'
import { useTranslation } from 'react-i18next'
import { Languages, Check } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export default function LangToggle() {
  const { i18n } = useTranslation()
  const currentLang = i18n.language || 'en'

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    const isRtl = lang.startsWith('ar')
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    localStorage.setItem('i18nextLng', lang)
  }

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', label: 'EN' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', label: 'عربي' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 gap-1.5 rounded-full border-border/60 bg-background/80 hover:bg-accent backdrop-blur-sm shadow-xs text-xs font-medium"
          aria-label="Select Language"
        >
          <Languages className="h-4 w-4 text-primary" />
          <span className="uppercase font-semibold tracking-wider">
            {currentLang.startsWith('ar') ? 'العربية' : 'English'}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px] rounded-xl">
        {languages.map((lang) => {
          const isActive = currentLang.startsWith(lang.code)
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center justify-between cursor-pointer rounded-lg text-sm ${
                isActive ? 'bg-accent font-semibold text-primary' : ''
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </span>
              {isActive && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

