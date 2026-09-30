import Link from "next/link";

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

/** Pill tabs linking to filtered views of a single admin list. */
export function AdminTabs({ tabs, activeKey, ariaLabel }: AdminTabsProps) {
  return (
    <nav aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const active = tab.key === activeKey;
        return (
          <Link
            key={tab.key}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              active
                ? "bg-brand-ink text-white"
                : "bg-white text-brand-ink ring-1 ring-black/10 hover:bg-[#f5f5f5]",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
