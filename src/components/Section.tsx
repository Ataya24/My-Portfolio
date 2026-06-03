import type { ReactNode } from "react";

export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-14 sm:py-18">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-6 sm:mb-8">
          <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/70 sm:text-base">
              {subtitle}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  );
}

