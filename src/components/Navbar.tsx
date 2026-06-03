"use client";

import { useEffect, useMemo, useState } from "react";
import { sections, type SectionId } from "@/lib/sections";
import { useActiveSection } from "@/lib/useActiveSection";

function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const { active, setActive } = useActiveSection();
  const [open, setOpen] = useState(false);
  const items = useMemo(() => sections, []);
  const mobileCloseMs = 300;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/95 backdrop-blur shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button
          type="button"
          className="font-heading text-lg font-semibold tracking-tight"
          onClick={() => {
            setActive("home");
            scrollToSection("home");
          }}
          aria-label="Go to home"
        >
          Ataya's Portfolio
        </button>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {items.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setActive(s.id);
                  scrollToSection(s.id);
                }}
                className={[
                  "relative text-[15px] font-medium transition-colors",
                  isActive ? "text-foreground" : "text-foreground/70 hover:text-foreground",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {s.label}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute -bottom-2 left-0 h-0.5 w-full origin-left rounded bg-accent transition-transform",
                    isActive ? "scale-x-100" : "scale-x-0",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-card md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span
            aria-hidden="true"
            className={[
              "absolute h-0.5 w-6 rounded bg-foreground transition-transform duration-300 ease-out",
              open ? "translate-y-0 rotate-45" : "-translate-y-2 rotate-0",
            ].join(" ")}
          />
          <span
            aria-hidden="true"
            className={[
              "absolute h-0.5 w-6 rounded bg-foreground transition-all duration-300 ease-out",
              open ? "opacity-0" : "opacity-100",
            ].join(" ")}
          />
          <span
            aria-hidden="true"
            className={[
              "absolute h-0.5 w-6 rounded bg-foreground transition-transform duration-300 ease-out",
              open ? "translate-y-0 -rotate-45" : "translate-y-2 rotate-0",
            ].join(" ")}
          />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={[
          "md:hidden",
          "overflow-hidden border-t border-black/5 bg-background/95 backdrop-blur transition-[max-height,opacity,transform] duration-300 ease-out",
          open ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1",
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
          <div className="grid gap-1">
            {items.map((s) => {
              const isActive = s.id === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setActive(s.id);
                    // Wait for the mobile menu close animation to finish,
                    // so the final scroll position doesn't end up "in between".
                    window.setTimeout(() => scrollToSection(s.id), mobileCloseMs);
                  }}
                  className={[
                    "flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium",
                    isActive
                      ? "bg-accent/10 text-foreground"
                      : "text-foreground/80 hover:bg-black/5 hover:text-foreground",
                  ].join(" ")}
                >
                  <span>{s.label}</span>
                  {isActive ? <span className="h-2 w-2 rounded-full bg-accent" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

