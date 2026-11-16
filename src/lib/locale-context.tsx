"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getDictionary, locales, translations, type Dictionary, type Locale } from "@/lib/i18n";
import type { Achievement, ExperienceItem, Project } from "@/data/portfolio";
import { profile, projects as projectsId, experiences as experiencesId, achievements as achievementsId } from "@/data/portfolio";
import { profileEn, projectsEn, experiencesEn, achievementsEn } from "@/data/portfolio.en";

export type LocalizedContent = {
  locale: Locale;
  t: Dictionary;
  otherLocale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  projects: Project[];
  experiences: ExperienceItem[];
  achievements: Achievement[];
  about: string;
  tagline: string;
};

const STORAGE_KEY = "portfolio-locale";

const LocaleContext = createContext<LocalizedContent | null>(null);

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    let next: Locale = "id";
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored)) {
        next = stored;
      } else if (typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("en")) {
        next = "en";
      }
    } catch {
      // storage unavailable — keep the default
    }
    setLocaleState((current) => (current === next ? current : next));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore write failures (private mode, etc.)
    }
  }, []);

  const value = useMemo<LocalizedContent>(() => {
    const isEn = locale === "en";
    return {
      locale,
      otherLocale: isEn ? "id" : "en",
      t: getDictionary(locale),
      setLocale,
      toggleLocale: () => setLocale(isEn ? "id" : "en"),
      projects: isEn ? withScreenshots(projectsEn, projectsId) : projectsId,
      experiences: isEn ? experiencesEn : experiencesId,
      achievements: isEn ? achievementsEn : achievementsId,
      about: isEn ? profileEn.about : profile.about,
      tagline: isEn ? profileEn.tagline : profile.tagline,
    };
  }, [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

function withScreenshots(source: Project[], reference: Project[]): Project[] {
  const shotsById = new Map(reference.map((p) => [p.id, p.screenshots]));
  return source.map((p) => {
    const shots = shotsById.get(p.id);
    return shots && shots.length ? { ...p, screenshots: shots } : p;
  });
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return context;
}

export { translations };
export type { Dictionary, Locale };
