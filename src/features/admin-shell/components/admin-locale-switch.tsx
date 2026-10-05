"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { cn } from "@/shared/lib/cn";

import { setAdminLocale } from "../actions/set-admin-locale";
import { useAdminI18n } from "../i18n/admin-i18n-provider";
import { adminLocales, type AdminLocale } from "../i18n/locales";

type AdminLocaleSwitchProps = {
  tone?: "light" | "dark";
};

export function AdminLocaleSwitch({ tone = "light" }: AdminLocaleSwitchProps) {
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

  const activeIndex = Math.max(0, adminLocales.indexOf(locale));

  return (
    <div
      role="group"
      aria-label={t("language.aria")}
      className={cn("relative grid grid-cols-3 gap-1 rounded-xl p-1", tone === "dark" ? "bg-white/10" : "bg-[#f5f5f5]")}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1 bottom-1 left-1 w-[calc((100%-1rem)/3)] rounded-lg bg-white shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(calc(${activeIndex} * (100% + 0.25rem)))` }}
      />
      {adminLocales.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={item === locale}
          disabled={pending}
          onClick={() => select(item)}
          className={cn(
            "relative z-10 rounded-lg py-2 text-xs font-bold tracking-wide transition-colors duration-300 disabled:opacity-60",
            item === locale ? "text-brand-ink" : tone === "dark" ? "text-white/70 hover:text-white" : "text-[#6f6f6f] hover:text-brand-ink",
          )}
        >
          {t(`language.${item}`)}
        </button>
      ))}
    </div>
  );
}
