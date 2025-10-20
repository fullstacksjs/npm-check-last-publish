import type {
  PackagePublishInfo,
  SortBy,
  SortOrder,
  Thresholds,
} from "../types.ts";
import { formatPackageInfo } from "./format-package-info.ts";
import { sortPackages } from "./sort-packages.ts";

interface ProcessPackageOptions {
  results: PackagePublishInfo[];
  sortBy: SortBy;
  sortOrder: SortOrder;
  thresholds: Thresholds;
}

function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null;
}

export function processPackageData({
  results,
  sortBy,
  sortOrder,
  thresholds,
}: ProcessPackageOptions) {
  const validResults = results.filter(isDefined);
  const formatted = validResults.map((pkg) =>
    formatPackageInfo({ pkg, thresholds }),
  );
  return sortPackages(formatted, sortBy, sortOrder);
}
