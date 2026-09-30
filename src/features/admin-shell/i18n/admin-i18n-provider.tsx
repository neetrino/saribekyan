"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

import type { AdminLocale } from "./locales";
import { createAdminT, type AdminMessages, type AdminT } from "./translate";

type AdminI18nValue = {
  locale: AdminLocale;
  t: AdminT;
};

const AdminI18nContext = createContext<AdminI18nValue | null>(null);

type AdminI18nProviderProps = {
  locale: AdminLocale;
  messages: AdminMessages;
  children: ReactNode;
};

export function AdminI18nProvider({ locale, messages, children }: AdminI18nProviderProps) {
  const value = useMemo<AdminI18nValue>(
    () => ({ locale, t: createAdminT(messages) }),
    [locale, messages],
  );

  return <AdminI18nContext.Provider value={value}>{children}</AdminI18nContext.Provider>;
}

export function useAdminI18n(): AdminI18nValue {
  const value = useContext(AdminI18nContext);
  if (!value) {
    throw new Error("useAdminI18n must be used within AdminI18nProvider");
  }
  return value;
}
