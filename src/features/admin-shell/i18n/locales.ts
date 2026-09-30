export const adminLocales = ["en", "hy", "ru"] as const;

export type AdminLocale = (typeof adminLocales)[number];

export const ADMIN_LOCALE_COOKIE = "admin_locale";

export function isAdminLocale(value: string | undefined): value is AdminLocale {
  return value !== undefined && adminLocales.some((locale) => locale === value);
}

/** Public pages exist for hy and en. Russian admin UI opens the default public locale. */
export function adminPublicSiteHref(locale: AdminLocale): string {
  return locale === "en" ? "/en" : "/hy";
}
