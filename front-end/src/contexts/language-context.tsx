"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Dashboard Header
    "courses.count": "courses",
    "profile": "Profile",
    "theme.toggle": "Toggle theme",
    
    // Action Buttons
    "button.filter": "Filter",
    "button.review": "Review",
    
    // Course Card
    "course.start": "Start",
    "course.review": "Review",
    "course.filter": "Filter",
    "course.stats": "Stats",
    "course.layer": "Layer",
    "course.progress": "of",
    
    // Filter Section
    "filter.sources.hyper": "Highly Testable Sources",
    "filter.sources.medium": "Moderately Testable Sources",
    "filter.sources.other": "Other Sources",
    "filter.biochemistry": "Biochemistry UE1",
    "filter.pass.qcm": "PASS in QCM",
    "filter.ue2.qcm": "All UE2 in QCM",
    
    // Course titles
    "course.biochemistry": "Biochemistry",
    "course.neoglucogenesis": "1- Neoglucogenesis",
    "course.other": "2- Other course",
  },
  fr: {
    // Dashboard Header
    "courses.count": "Cours",
    "profile": "Profil",
    "theme.toggle": "Changer le thème",
    
    // Action Buttons
    "button.filter": "Filtrer",
    "button.review": "Réviser",
    
    // Course Card
    "course.start": "Commencer",
    "course.review": "Réviser",
    "course.filter": "Filtrer",
    "course.stats": "Stats",
    "course.layer": "Couche",
    "course.progress": "sur",
    
    // Filter Section
    "filter.sources.hyper": "Sources Hypertombables",
    "filter.sources.medium": "Sources Moyennement tombables",
    "filter.sources.other": "Autres",
    "filter.biochemistry": "Biochimie UE1",
    "filter.pass.qcm": "PASS en QCM",
    "filter.ue2.qcm": "Tout UE2 en QCM",
    
    // Course titles
    "course.biochemistry": "Biochimie",
    "course.neoglucogenesis": "1- La néoglucogenèse",
    "course.other": "2- Autre cours",
  },
  ar: {
    // Dashboard Header
    "courses.count": "دروس",
    "profile": "الملف الشخصي",
    "theme.toggle": "تبديل المظهر",
    
    // Action Buttons
    "button.filter": "تصفية",
    "button.review": "مراجعة",
    
    // Course Card
    "course.start": "ابدأ",
    "course.review": "راجع",
    "course.filter": "تصفية",
    "course.stats": "إحصائيات",
    "course.layer": "طبقة",
    "course.progress": "من",
    
    // Filter Section
    "filter.sources.hyper": "مصادر عالية الأهمية",
    "filter.sources.medium": "مصادر متوسطة الأهمية",
    "filter.sources.other": "مصادر أخرى",
    "filter.biochemistry": "الكيمياء الحيوية UE1",
    "filter.pass.qcm": "PASS في QCM",
    "filter.ue2.qcm": "جميع UE2 في QCM",
    
    // Course titles
    "course.biochemistry": "الكيمياء الحيوية",
    "course.neoglucogenesis": "1- تكوين الجلوكوز الجديد",
    "course.other": "2- دورة أخرى",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");
  const [mounted, setMounted] = useState(false);

  const updateDirection = (lang: Language) => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  };

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "fr", "ar"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
      updateDirection(savedLanguage);
    }
    setMounted(true);
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem("language", newLanguage);
    updateDirection(newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    dir,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
