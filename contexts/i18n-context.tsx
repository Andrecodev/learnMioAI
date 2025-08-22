"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Locale, defaultLocale, locales, translations, type Translations } from "@/lib/i18n"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  translations: Translations
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  // Load saved locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale
    if (savedLocale && locales.includes(savedLocale)) {
      setLocale(savedLocale)
    }
  }, [])

  // Save locale to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("locale", locale)
    document.documentElement.lang = locale
  }, [locale])

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  const value: I18nContextType = {
    locale,
    setLocale,
    t,
    translations: translations[locale],
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
