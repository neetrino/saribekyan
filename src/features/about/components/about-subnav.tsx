"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

type AboutSubnavItem = {
  label: string;
  href: string;
};

type AboutSubnavProps = {
  items: AboutSubnavItem[];
  ariaLabel: string;
};

export function AboutSubnav({ items, ariaLabel }: AboutSubnavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={ariaLabel}
      className="mb-12 overflow-x-auto rounded-[80px] bg-[#ededed] p-2 sm:p-3"
    >
      <ul className="flex min-w-max items-center gap-2">
        {items.map((item) => {
          const active =
            item.href === "/about"
              ? pathname === "/about"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                prefetch
                className={cn(
                  "inline-flex h-11 items-center rounded-full px-5 text-sm transition-colors sm:text-base",
                  active
                    ? "bg-brand-ink font-bold text-white"
                    : "bg-white text-[#8f8f8f] hover:text-brand-ink",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
