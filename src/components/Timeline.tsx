import type { ExperienceItem } from "@/data/portfolio";

export function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative ml-3 grid gap-6 border-l border-black/10 pl-6">
      {items.map((it) => (
        <li key={it.id} className="relative">
          <span className="absolute left-[-30.4px] top-1.5 h-3 w-3 rounded-full bg-accent" />
          <div className="rounded-2xl border border-black/10 bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="font-heading text-base font-semibold tracking-tight">
                  {it.title}
                </div>
                {it.org ? (
                  <div className="text-sm text-foreground/70">{it.org}</div>
                ) : null}
              </div>
              <div className="text-xs font-medium text-foreground/60">{it.period}</div>
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-foreground/80">
              {it.bullets.map((b, idx) => (
                <li key={`${it.id}-${idx}`} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                  <span className="leading-6">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

