import type { PackageInfo } from "../models/package-info.ts";
import type { SortBy, SortOrder } from "../types.js";

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
        if (a.averagePublishDays == null) {
          result = -1;
          break;
        }
        if (b.averagePublishDays == null) {
          result = 1;
          break;
        }

        result = a.averagePublishDays - b.averagePublishDays;
        break;
      default:
        if (a.date == null) {
          result = -1;
          break;
        }
        if (b.date == null) {
          result = 1;
          break;
        }
        result = a.date.getTime() - b.date.getTime();
    }

    return sortOrder === "desc" ? -result : result;
  });
}
