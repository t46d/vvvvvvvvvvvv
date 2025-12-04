'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Globe, Check } from 'lucide-react';

export default function LanguageSwitcher() {
  const { currentLanguage, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(l => l.code === currentLanguage);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* زر تبديل اللغة */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-5 h-5 text-gray-700" />
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
          {currentLang?.flag} {currentLang?.name}
        </span>
      </button>

      {/* القائمة المنسدلة */}
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[200px] z-50 animate-slide-up">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors ${
                currentLanguage === lang.code ? 'bg-primary-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{lang.flag}</span>
                <span className={`text-sm font-medium ${
                  currentLanguage === lang.code ? 'text-primary-600' : 'text-gray-700'
                }`}>
                  {lang.name}
                </span>
              </div>
              {currentLanguage === lang.code && (
                <Check className="w-4 h-4 text-primary-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}