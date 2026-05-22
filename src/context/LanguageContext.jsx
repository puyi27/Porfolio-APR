import React, { createContext, useState, useContext, useEffect } from 'react';
import es from '../translations/es.json';
import en from '../translations/en.json';
import it from '../translations/it.json';
import de from '../translations/de.json';

const translations = { es, en, it, de };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');

  useEffect(() => {
    // Check if user has a language saved
    const savedLanguage = localStorage.getItem('portfolio-language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      // Basic browser detection
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) {
        setLanguage(browserLang);
      }
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('portfolio-language', lang);
  };

  // Helper to get nested objects by string "hero.title"
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    return value || key; // Fallback to key if not found
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
