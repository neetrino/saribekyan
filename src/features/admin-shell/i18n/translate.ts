import type { AdminLocale } from "./locales";
import type { AdminMessages } from "./catalog";

export type { AdminMessages } from "./catalog";

export type AdminT = (key: string, values?: Record<string, string | number>) => string;

type PluralForm = "one" | "few" | "many" | "other";

function lookup(source: AdminMessages, key: string): string | undefined {
  let current: unknown = source;
  for (const part of key.split(".")) {
    if (typeof current !== "object" || current === null || !(part in current)) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
}

function applyValues(template: string, values: Record<string, string | number> | undefined): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/gu, (token, name: string) => {
    const value = values[name];
    return value === undefined ? token : String(value);
  });
}

/** Resolves a dotted message key. Unknown keys are returned unchanged. */
export function createAdminT(messages: AdminMessages): AdminT {
  return (key, values) => applyValues(lookup(messages, key) ?? key, values);
}

/** Uses the catalog string when it exists, otherwise the English config label. */
export function messageOrFallback(t: AdminT, key: string, fallback: string): string {
  const value = t(key);
  return value === key ? fallback : value;
}

function pluralForm(locale: AdminLocale, count: number): PluralForm {
  const abs = Math.abs(count);
  if (locale !== "ru") return abs === 1 ? "one" : "other";

  const mod100 = abs % 100;
  const mod10 = abs % 10;
  if (mod100 > 10 && mod100 < 20) return "many";
  if (mod10 === 1) return "one";
  if (mod10 >= 2 && mod10 <= 4) return "few";
  return "many";
}

/** Picks `baseKey.one|few|many|other` for the admin locale. */
export function adminCountLabel(locale: AdminLocale, count: number, t: AdminT, baseKey: string): string {
  return t(`${baseKey}.${pluralForm(locale, count)}`, { count });
}
