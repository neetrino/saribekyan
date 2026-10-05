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
    <aside className="flex w-full shrink-0 flex-col rounded-br-3xl rounded-tr-3xl bg-[#2d5650] text-white md:h-full md:w-64 md:overflow-y-auto">
      <div className="px-5 py-6">
        <Link href={adminPublicSiteHref(locale)} className="font-jakarta text-base font-extrabold tracking-wide text-white">
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
                active ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-3 border-t border-white/10 p-4">
        <Link
          href={adminPublicSiteHref(locale)}
          target="_blank"
          className="block text-sm text-white/70 transition-colors hover:text-white"
        >
          {t("viewSite")}
        </Link>
        <form action={logoutAdmin}>
          <button type="submit" className="text-sm font-semibold text-white hover:underline">
            {t("signOut")}
          </button>
        </form>
        <AdminLocaleSwitch tone="dark" />
      </div>
    </aside>
  );
}
