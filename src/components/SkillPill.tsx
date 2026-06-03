import type { SkillLevel } from "@/data/portfolio";

function levelStyle(level: SkillLevel) {
  switch (level) {
    case "Advanced":
      return "bg-accent/10 text-foreground border-accent/40";
    case "Intermediate":
      return "bg-black/5 text-foreground border-black/10";
    case "Beginner":
      return "bg-background text-foreground/80 border-black/10";
  }
}

export function SkillPill({ name, level }: { name: string; level: SkillLevel }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-black/10 bg-card px-3 py-2 text-sm">
      <div className="font-medium">{name}</div>
      <span
        className={[
          "rounded-full border px-2 py-0.5 text-[11px] font-semibold",
          levelStyle(level),
        ].join(" ")}
      >
        {level}
      </span>
    </div>
  );
}

