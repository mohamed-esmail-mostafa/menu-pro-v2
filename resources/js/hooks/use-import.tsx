import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAppearance } from './use-appearance';

export default function useImport() {
  const { t, i18n } = useTranslation();
  const { appearance } = useAppearance();
  const dark = appearance === "dark"
  const isAr = i18n.language === "ar"
  return {
    t, i18n, isAr, appearance, dark
  }
}
