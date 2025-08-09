import { formatPackageInfo } from "./format-package-info.js";
import { sortPackages } from "./sort-packages.js";

function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

import type { PackagePublishInfo, SortBy, SortOrder } from "../types.js";

export function processPackageData(
  results: PackagePublishInfo[],
  sortBy: SortBy,
  sortOrder: SortOrder,
) {
  const validResults = results.filter(isDefined);
  const formatted = validResults.map(formatPackageInfo);
  return sortPackages(formatted, sortBy, sortOrder);
}
