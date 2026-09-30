type OrderedEntry = {
  year: number;
  sortOrder: number;
  createdAt: Date;
};

/**
 * Display order of a section on the site. Year-grouped sections show the newest year first
 * and apply the admin order within each year; other sections use the admin order only.
 */
export function compareSectionEntries(groupByYear: boolean) {
  return (a: OrderedEntry, b: OrderedEntry): number =>
    (groupByYear ? b.year - a.year : 0) ||
    a.sortOrder - b.sortOrder ||
    a.createdAt.getTime() - b.createdAt.getTime();
}
