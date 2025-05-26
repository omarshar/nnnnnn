"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'ar' | 'en';
type Direction = 'rtl' | 'ltr';

interface LocalizationContextType {
  locale: Locale;
  direction: Direction;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

interface LocalizationProviderProps {
  children: ReactNode;
}

export function LocalizationProvider({ children }: LocalizationProviderProps) {
  const [locale, setLocale] = useState<Locale>('ar');
  const [direction, setDirection] = useState<Direction>('rtl');
  
  useEffect(() => {
    // Update direction based on locale
    setDirection(locale === 'ar' ? 'rtl' : 'ltr');
    
    // Update document direction
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale]);
  
  const t = (key: string): string => {
    // Simple translation function
    // In a real app, this would be more sophisticated
    const translations: Record<string, Record<string, string>> = {
      ar: {
        'dashboard': 'لوحة التحكم',
        'inventory': 'المخزون',
        'products': 'المنتجات',
        'categories': 'الفئات',
        'branches': 'الفروع',
        'users': 'المستخدمين',
        'settings': 'الإعدادات',
        'logout': 'تسجيل الخروج',
        'welcome': 'مرحباً بك في نظام إدارة المخزون',
      },
      en: {
        'dashboard': 'Dashboard',
        'inventory': 'Inventory',
        'products': 'Products',
        'categories': 'Categories',
        'branches': 'Branches',
        'users': 'Users',
        'settings': 'Settings',
        'logout': 'Logout',
        'welcome': 'Welcome to Inventory Management System',
      },
    };
    
    return translations[locale]?.[key] || key;
  };
  
  return (
    <LocalizationContext.Provider value={{ locale, direction, setLocale, t }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  const context = useContext(LocalizationContext);
  
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  
  return context;
}
