"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { type Lang, type Translation, t } from "@/lib/translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  tr: Translation;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  tr: t.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sfusa-lang") as Lang | null;
      if (saved === "en" || saved === "es") {
        setLangState(saved);
      }
    } catch {}
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("sfusa-lang", newLang);
    } catch {}
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
