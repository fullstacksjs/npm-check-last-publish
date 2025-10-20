import type { PackageInfo, SortBy, SortOrder } from "../types.ts";

export function sortPackages(
  list: PackageInfo[],
  sortBy: SortBy,
  sortOrder: SortOrder,
): PackageInfo[] {
  return list.sort((a, b) => {
    let result = 0;

    switch (sortBy) {
      case "name":
        result = a.name.localeCompare(b.name);
        break;
      case "average":
        result = a.averagePublishDays - b.averagePublishDays;
        break;
      default:
        result = a.date.getTime() - b.date.getTime();
    }

    return sortOrder === "desc" ? -result : result;
  });
}
