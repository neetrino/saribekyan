"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/cn";

export type AdminTab = {
  key: string;
  label: string;
  href: string;
};

type AdminTabsProps = {
  tabs: readonly AdminTab[];
  activeKey: string;
  ariaLabel: string;
};

/** Segmented switch for filtered views of a single admin list. */
export function AdminTabs({ tabs, activeKey, ariaLabel }: AdminTabsProps) {
  const listRef = useRef<HTMLElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });
  const activeIndex = Math.max(0, tabs.findIndex((tab) => tab.key === activeKey));

  useLayoutEffect(() => {
    const list = listRef.current;
    const active = list?.querySelectorAll<HTMLElement>("a")[activeIndex];
    if (!list || !active) return;
    setIndicator({ x: active.offsetLeft, width: active.offsetWidth });
  }, [activeIndex, tabs]);

  return (
    <nav
      ref={listRef}
      aria-label={ariaLabel}
      className="relative inline-flex max-w-full gap-1 overflow-x-auto rounded-full bg-[#e7f3f1] p-1"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1 bottom-1 rounded-full bg-brand-teal shadow-sm transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ left: indicator.x, width: indicator.width }}
      />
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Link
            key={tab.key}
            href={tab.href}
            scroll={false}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative z-10 shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
              active ? "text-white" : "text-brand-ink hover:text-brand-teal",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
