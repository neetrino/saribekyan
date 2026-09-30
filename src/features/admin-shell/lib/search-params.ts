export type RawSearchParams = Record<string, string | string[] | undefined>;

/** First trimmed value of a URL search param. */
export function firstParam(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

/** Add/edit drawer opened over an admin list, encoded in the URL so it survives reloads. */
export type AdminDrawer = { mode: "new" } | { mode: "edit"; id: string };

const ENTRY_ID_PATTERN = /^[a-z0-9]{1,64}$/u;

export function parseAdminDrawer(params: RawSearchParams): AdminDrawer | null {
  if (firstParam(params.drawer) === "new") return { mode: "new" };
  const id = firstParam(params.edit);
  return ENTRY_ID_PATTERN.test(id) ? { mode: "edit", id } : null;
}

export function appendDrawerParams(params: URLSearchParams, drawer: AdminDrawer | undefined): void {
  if (drawer?.mode === "new") params.set("drawer", "new");
  if (drawer?.mode === "edit") params.set("edit", drawer.id);
}
