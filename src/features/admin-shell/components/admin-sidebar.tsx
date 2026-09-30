"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { logoutAdmin } from "@/features/admin-auth/actions/auth-actions";
import { cn } from "@/shared/lib/cn";

import { adminNavItems } from "../config/nav";
import { useAdminI18n } from "../i18n/admin-i18n-provider";
import { adminPublicSiteHref } from "../i18n/locales";
import { AdminLocaleSwitch } from "./admin-locale-switch";

function isNavActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar() {
  const pathname = usePathname();
  const { locale, t } = useAdminI18n();

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-black/5 bg-white md:h-full md:w-64 md:overflow-y-auto md:border-r md:border-b-0">
      <div className="px-5 py-5">
        <Link href={adminPublicSiteHref(locale)} className="font-jakarta text-base font-extrabold text-brand-ink">
          {t("brand")}
        </Link>
      </div>
      <nav aria-label={t("nav.aria")} className="flex flex-1 flex-col gap-1 px-3">
        {adminNavItems.map((item) => {
          const active = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                active ? "bg-brand-ink text-white" : "text-brand-ink hover:bg-[#f5f5f5]",
              )}
            >
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-3 border-t border-black/5 p-4">
        <Link
          href={adminPublicSiteHref(locale)}
          target="_blank"
          className="block text-sm text-[#6f6f6f] hover:text-brand-ink"
        >
          {t("viewSite")}
        </Link>
        <form action={logoutAdmin}>
          <button type="submit" className="text-sm font-semibold text-brand-ink hover:underline">
            {t("signOut")}
          </button>
        </form>
        <AdminLocaleSwitch />
      </div>
    </aside>
  );
}
