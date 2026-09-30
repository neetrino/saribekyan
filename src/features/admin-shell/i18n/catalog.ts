import en from "./messages/en.json";
import hy from "./messages/hy.json";
import ru from "./messages/ru.json";

import type { AdminLocale } from "./locales";

export type AdminMessages = typeof en;

export const adminCatalog: Record<AdminLocale, AdminMessages> = { en, hy, ru };
