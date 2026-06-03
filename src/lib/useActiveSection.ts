"use client";

import { useEffect, useMemo, useState } from "react";
import type { SectionId } from "./sections";
import { sections } from "./sections";

export function useActiveSection() {
  const ids = useMemo(() => sections.map((s) => s.id), []);
  const [active, setActive] = useState<SectionId>("home");

  useEffect(() => {
    const updateActive = () => {
      const elements = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      if (elements.length === 0) return;

      const headerOffset = 96;
      const positions = elements.map((el) => ({
        id: el.id as SectionId,
        rect: el.getBoundingClientRect(),
      }));

      const visibleSection = positions
        .filter((item) => item.rect.top <= headerOffset && item.rect.bottom > headerOffset)
        .sort((a, b) => b.rect.top - a.rect.top)[0];

      const nextSection =
        visibleSection ||
        positions
          .filter((item) => item.rect.top > headerOffset)
          .sort((a, b) => a.rect.top - b.rect.top)[0] ||
        positions[0];

      if (nextSection) {
        setActive((current) => (current !== nextSection.id ? nextSection.id : current));
      }
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [ids]);

  return { active, setActive };
}

