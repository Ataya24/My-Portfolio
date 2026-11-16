"use client";

import { useLocale } from "@/lib/locale-context";

function FlagID({ className = "h-5 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 20" aria-hidden="true" preserveAspectRatio="none">
      <rect width="28" height="10" fill="#CE1126" />
      <rect y="10" width="28" height="10" fill="#FFFFFF" />
    </svg>
  );
}

function FlagGB({ className = "h-5 w-7" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 20" aria-hidden="true">
      <rect width="28" height="20" fill="#0A17A7" />
      <path d="M0 0 28 20M28 0 0 20" stroke="#FFFFFF" strokeWidth="4" />
      <path d="M0 0 28 20M28 0 0 20" stroke="#D80027" strokeWidth="2" />
      <path d="M14 0v20M0 10h28" stroke="#FFFFFF" strokeWidth="7" />
      <path d="M14 0v20M0 10h28" stroke="#D80027" strokeWidth="4" />
    </svg>
  );
}

const flags = {
  id: FlagID,
  en: FlagGB,
} as const;

const languageNames = {
  id: "Indonesia",
  en: "English",
} as const;

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, otherLocale, setLocale, t } = useLocale();
  const Flag = flags[locale];
  const targetName = languageNames[otherLocale];

  return (
    <button
      type="button"
      onClick={() => setLocale(otherLocale)}
      title={`${t.a11y.switchTo} ${targetName}`}
      aria-label={`${t.a11y.switchTo} ${targetName}`}
      className={[
        "inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-card px-2.5 py-2 text-foreground/80 transition-all duration-200 hover:bg-black/5 hover:text-foreground active:scale-95",
        className,
      ].join(" ")}
    >
      <span className="overflow-hidden rounded-[3px] shadow-xs ring-1 ring-black/10">
        <Flag className="block h-4 w-6" />
      </span>
      <span className="text-xs font-semibold tracking-wide">{locale.toUpperCase()}</span>
    </button>
  );
}
