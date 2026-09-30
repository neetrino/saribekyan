export type AdminNavItem = {
  /** Admin path. The item stays active for this path and its child routes. */
  href: string;
  /** Message key in the admin catalogs, for example `nav.team`. */
  labelKey: string;
};

/**
 * Sidebar entries. To add a section: append an item here and the same
 * `labelKey` in `i18n/messages/en.json`, `hy.json`, and `ru.json`.
 */
export const adminNavItems: readonly AdminNavItem[] = [
  { href: "/admin/team", labelKey: "nav.team" },
  { href: "/admin/documents", labelKey: "nav.documents" },
];
