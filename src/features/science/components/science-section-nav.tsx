"use client";

import { useEffect, useState } from "react";

import { cn } from "@/shared/lib/cn";
import { DragScrollNav } from "@/shared/ui/drag-scroll-nav";

type ScienceSectionNavItem = {
  id: string;
  label: string;
};

type ScienceSectionNavProps = {
  items: ScienceSectionNavItem[];
  ariaLabel: string;
};

export function ScienceSectionNav({
  items,
  ariaLabel,
}: ScienceSectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );

        const top = visible[0];
        if (top?.target.id) {
          setActiveId(top.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.55],
      },
    );

    for (const section of sections) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [items]);

  return (
    <DragScrollNav
      ariaLabel={ariaLabel}
      className="mb-12 w-fit max-w-full rounded-[80px] bg-[#ededed] p-2 sm:p-3"
    >
      <ul className="flex min-w-max items-center gap-2">
        {items.map((item) => {
          const active = activeId === item.id;

          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "inline-flex h-11 items-center rounded-full px-5 text-sm transition-colors sm:text-base",
                  active
                    ? "bg-brand-ink font-bold text-white"
                    : "bg-white text-[#8f8f8f] hover:text-brand-ink",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </DragScrollNav>
  );
}
