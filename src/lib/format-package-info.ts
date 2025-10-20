import type { PackageInfo, PackagePublishInfo, Thresholds } from "../types.ts";
import { getAveragePublishDays } from "./get-average-publish-days.ts";
import { getColorArea } from "./get-color-area.ts";

interface FormatPackageOptions {
  pkg: PackagePublishInfo;
  thresholds: Thresholds;
}

export function formatPackageInfo({
  pkg,
  thresholds,
}: FormatPackageOptions): PackageInfo {
  const { packageName, packagePublishDate, packageVersion, publishedTimes } =
    pkg;

  const averagePublishDays = getAveragePublishDays(publishedTimes);

  const today = Temporal.Now.plainDateISO();
  const publishDate = packagePublishDate
    .toTemporalInstant()
    .toZonedDateTimeISO("UTC");

  const diffDays = today.since(publishDate).days;

  return {
    name: packageName,
    version: packageVersion,
    date: packagePublishDate,
    diffDays,
    area: getColorArea({ diffDays, thresholds }),
    averagePublishDays,
  };
}
