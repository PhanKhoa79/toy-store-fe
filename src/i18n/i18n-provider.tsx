'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { en } from './dictionaries/en';
import { vi } from './dictionaries/vi';
import type { Dictionary, Locale } from './types';

const dictionaries: Record<Locale, Dictionary> = { vi, en };

type I18nContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('vi');

  useEffect(() => {
    const storedLocale = window.localStorage.getItem('toyshop-locale');
    if (storedLocale === 'vi' || storedLocale === 'en') {
      setLocaleState(storedLocale);
    }
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    function setLocale(nextLocale: Locale) {
      setLocaleState(nextLocale);
      window.localStorage.setItem('toyshop-locale', nextLocale);
      document.documentElement.lang = nextLocale;
    }

    return {
      locale,
      dictionary: dictionaries[locale],
      setLocale
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
