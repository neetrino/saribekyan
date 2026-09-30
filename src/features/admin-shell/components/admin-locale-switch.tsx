"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { cn } from "@/shared/lib/cn";

import { setAdminLocale } from "../actions/set-admin-locale";
import { useAdminI18n } from "../i18n/admin-i18n-provider";
import { adminLocales, type AdminLocale } from "../i18n/locales";

export function AdminLocaleSwitch() {
  const { locale, t } = useAdminI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function select(next: AdminLocale) {
    if (next === locale) return;
    startTransition(async () => {
      await setAdminLocale(next);
      router.refresh();
    });
  }

  return (
    <div role="group" aria-label={t("language.aria")} className="grid grid-cols-3 gap-1 rounded-xl bg-[#f5f5f5] p-1">
      {adminLocales.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={item === locale}
          disabled={pending}
          onClick={() => select(item)}
          className={cn(
            "rounded-lg py-2 text-xs font-bold tracking-wide transition-colors disabled:opacity-60",
            item === locale ? "bg-white text-brand-ink shadow-sm" : "text-[#6f6f6f] hover:text-brand-ink",
          )}
        >
          {t(`language.${item}`)}
        </button>
      ))}
    </div>
  );
}
