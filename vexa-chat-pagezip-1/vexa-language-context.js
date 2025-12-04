'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { languages, defaultLanguage, getTranslation, getLanguageDir } from '@/lib/i18n';

const LanguageContext = createContext({});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(defaultLanguage);
  const [isLoading, setIsLoading] = useState(true);

  // جلب اللغة من localStorage عند التحميل
  useEffect(() => {
    const savedLanguage = localStorage.getItem('vexa-language');
    if (savedLanguage && languages.find(l => l.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // محاولة الحصول على لغة المتصفح
      const browserLang = navigator.language.split('-')[0];
      if (languages.find(l => l.code === browserLang)) {
        setCurrentLanguage(browserLang);
      }
    }
    setIsLoading(false);
  }, []);

  // تحديث document direction عند تغيير اللغة
  useEffect(() => {
    const dir = getLanguageDir(currentLanguage);
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLanguage;
    localStorage.setItem('vexa-language', currentLanguage);
  }, [currentLanguage]);

  // دالة تغيير اللغة
  const changeLanguage = (langCode) => {
    if (languages.find(l => l.code === langCode)) {
      setCurrentLanguage(langCode);
    }
  };

  // دالة الترجمة المختصرة
  const t = (key) => {
    return getTranslation(currentLanguage, key);
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    languages,
    dir: getLanguageDir(currentLanguage),
    isRTL: getLanguageDir(currentLanguage) === 'rtl',
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};