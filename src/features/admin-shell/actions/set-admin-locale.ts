"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { ADMIN_LOCALE_COOKIE, isAdminLocale, type AdminLocale } from "../i18n/locales";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Stores the admin UI language. Does not change the public site locale. */
export async function setAdminLocale(locale: AdminLocale): Promise<void> {
  if (!isAdminLocale(locale)) return;

  const store = await cookies();
  store.set(ADMIN_LOCALE_COOKIE, locale, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: ONE_YEAR_SECONDS,
  });
  revalidatePath("/admin", "layout");
}
