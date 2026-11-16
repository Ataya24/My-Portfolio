"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/data/portfolio";
import { useLocale } from "@/lib/locale-context";

export function ProjectModal({
  project,
  open,
  onRequestClose,
  onClosed,
}: {
  project: Project | null;
  open: boolean;
  onRequestClose: () => void;
  onClosed?: () => void;
}) {
  const { t } = useLocale();
  const closeAnimMs = 300;
  const [idx, setIdx] = useState(0);
  const [entered, setEntered] = useState(false);
  const [render, setRender] = useState(false);
  const shots = useMemo(() => project?.screenshots ?? [], [project]);
  const activeShot = shots[idx];

  useEffect(() => {
    if (!open) return;
    setRender(true);
    setIdx(0);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    const t = window.setTimeout(() => setEntered(true), 10);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!render) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onRequestClose();
      if (e.key === "ArrowLeft") setIdx((v) => Math.max(0, v - 1));
      if (e.key === "ArrowRight") setIdx((v) => Math.min(shots.length - 1, v + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [render, onRequestClose, shots.length]);

  useEffect(() => {
    if (!render) return;
    if (open) return;
    const t = window.setTimeout(() => {
      setRender(false);
      onClosed?.();
    }, closeAnimMs);
    return () => window.clearTimeout(t);
  }, [closeAnimMs, onClosed, open, render]);

  if (!render || !project) return null;

  const active = shots[idx]?.label ?? "Screenshot";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} ${t.projects.detailsLabel}`}
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
    >
      <button
        type="button"
        className={[
          "absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out",
          entered ? "opacity-100" : "opacity-0",
        ].join(" ")}
        aria-label={t.projects.close}
        onClick={onRequestClose}
      />

      <div
        className={[
          "relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-black/10 bg-card shadow-xl transition-[opacity,transform] duration-300 ease-out",
          entered ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-[0.98]",
        ].join(" ")}
      >
        {/* Header - lebih compact */}
        <div className="flex items-start justify-between gap-4 border-b border-black/5 p-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-lg font-semibold tracking-tight truncate">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-foreground/70 line-clamp-2">
              {project.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tools.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-black/10 bg-background px-2 py-0.5 text-xs font-medium text-foreground/80"
                >
                  {t}
                </span>
              ))}
              {project.tools.length > 3 && (
                <span className="rounded-full border border-black/10 bg-background px-2 py-0.5 text-xs font-medium text-foreground/60">
                  +{project.tools.length - 3}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onRequestClose}
            className="shrink-0 rounded-lg border border-black/10 bg-background px-3 py-1.5 text-sm font-medium hover:bg-black/5"
          >
            ✕
          </button>
        </div>

        {/* Content - lebih compact dengan scroll jika diperlukan */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid gap-4 p-4 sm:grid-cols-[1fr_160px]">
            {/* Main screenshot area */}
            <div>
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10 bg-background">
                {activeShot?.src ? (
                  <img
                    src={activeShot.src}
                    alt={activeShot.label}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-foreground/60">
                    {active} (placeholder)
                  </div>
                )}
              </div>
              
              {/* Navigation buttons - lebih kecil */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setIdx((v) => Math.max(0, v - 1))}
                  disabled={idx === 0}
                  className="rounded-lg border border-black/10 bg-background px-3 py-1.5 text-sm font-medium disabled:opacity-40 hover:bg-black/5 transition-colors"
                >
                  ← {t.projects.prev}
                </button>
                <div className="text-xs text-foreground/60">
                  {Math.min(idx + 1, shots.length || 1)} / {Math.max(shots.length, 1)}
                </div>
                <button
                  type="button"
                  onClick={() => setIdx((v) => Math.min(shots.length - 1, v + 1))}
                  disabled={idx >= shots.length - 1}
                  className="rounded-lg border border-black/10 bg-background px-3 py-1.5 text-sm font-medium disabled:opacity-40 hover:bg-black/5 transition-colors"
                >
                  {t.projects.next} →
                </button>
              </div>
            </div>

            {/* Gallery sidebar - lebih compact */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-foreground/60 mb-2">
                {t.projects.gallery}
              </div>
              <div className="grid gap-2 max-h-[280px] overflow-y-auto pr-1">
                {shots.length ? (
                  shots.map((s, i) => (
                    <button
                      key={`${project.id}-${s.label}-${i}`}
                      type="button"
                      onClick={() => setIdx(i)}
                      className={[
                        "rounded-lg border p-2 text-left transition-all",
                        i === idx
                          ? "border-accent bg-accent/5 ring-1 ring-accent/20"
                          : "border-black/10 bg-background hover:bg-black/5",
                      ].join(" ")}
                    >
                      <div className="aspect-video w-full overflow-hidden rounded bg-black/5 mb-1.5">
                        {s.src ? (
                          <img
                            src={s.src}
                            alt={s.label}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[10px] text-foreground/40">
                            {s.label}
                          </div>
                        )}
                      </div>
                      <div className="text-xs font-medium text-foreground/80 truncate">
                        {s.label}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="rounded-lg border border-black/10 bg-background p-2 text-xs text-foreground/60 text-center">
                    {t.projects.noScreenshots}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}