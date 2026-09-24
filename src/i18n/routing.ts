import { defineRouting } from "next-intl/routing";

export const locales = ["hy", "en"] as const;

export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "hy",
  localePrefix: "always",
});
