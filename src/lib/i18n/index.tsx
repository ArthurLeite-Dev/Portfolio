import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "./en";
import { pt } from "./pt";
import type { Language, Translations } from "./types";

export type { Language, Translations };

const STORAGE_KEY = "arthur-leite-portfolio:lang";

export const translations: Record<Language, Translations> = { pt, en };

const htmlLang: Record<Language, string> = { pt: "pt-BR", en: "en" };

interface LanguageContextValue {
  lang: Language;
  t: Translations;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readInitialLanguage(): Language {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "pt" || stored === "en") return stored;
  return window.navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Server-rendered markup is always Portuguese; we swap in the visitor's
  // real preference right after mount to avoid a hydration mismatch.
  const [lang, setLang] = useState<Language>("pt");

  useEffect(() => {
    setLang(readInitialLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = htmlLang[lang];
    window.localStorage.setItem(STORAGE_KEY, lang);

    const current = translations[lang];
    document.title = current.meta.title;
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) descriptionTag.setAttribute("content", current.meta.description);
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) ogTitleTag.setAttribute("content", current.meta.title);
    const ogDescriptionTag = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionTag) ogDescriptionTag.setAttribute("content", current.meta.description);
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: translations[lang],
      toggleLanguage: () => setLang((current) => (current === "pt" ? "en" : "pt")),
      setLanguage: setLang,
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
