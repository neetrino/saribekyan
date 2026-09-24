"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

import { howToApplyPathAliases } from "../content/hub";

type AdmissionsSubnavItem = {
  label: string;
  href: string;
};

type AdmissionsSubnavProps = {
  items: AdmissionsSubnavItem[];
  ariaLabel: string;
};

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/admissions") {
    return pathname === "/admissions";
  }

  if (href === "/admissions/how-to-apply") {
    return (
      pathname === href ||
      howToApplyPathAliases.some((alias) => pathname === alias)
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdmissionsSubnav({ items, ariaLabel }: AdmissionsSubnavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={ariaLabel}
      className="mb-12 overflow-x-auto rounded-[80px] bg-[#ededed] p-2 sm:p-3"
    >
      <ul className="flex min-w-max items-center gap-2">
        {items.map((item) => {
          const active = isActivePath(pathname, item.href);

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
