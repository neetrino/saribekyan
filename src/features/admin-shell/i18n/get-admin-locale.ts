import { cookies } from "next/headers";

import { adminCatalog, type AdminMessages } from "./catalog";
import { ADMIN_LOCALE_COOKIE, isAdminLocale, type AdminLocale } from "./locales";
import { createAdminT, type AdminT } from "./translate";

export type AdminI18n = {
  locale: AdminLocale;
  messages: AdminMessages;
  t: AdminT;
};

/** Reads the admin UI locale from the cookie. Missing or unknown values fall back to English. */
export async function getAdminI18n(): Promise<AdminI18n> {
  const store = await cookies();
  const raw = store.get(ADMIN_LOCALE_COOKIE)?.value;
  const locale = isAdminLocale(raw) ? raw : "en";
  const messages = adminCatalog[locale];
  return { locale, messages, t: createAdminT(messages) };
}
