import { errorPackageInfo, type PackageInfo } from "../models/package-info.ts";
import type { PackagePublishInfo } from "../models/package-publish-info.ts";
import type { Thresholds } from "../types.ts";
import { getAveragePublishDays } from "./get-average-publish-days.ts";
import { getColorArea } from "./get-color-area.ts";

interface FormatPackageOptions {
  publishInfo: PackagePublishInfo;
  thresholds: Thresholds;
}

export function formatPackageInfo({
  publishInfo,
  thresholds,
}: FormatPackageOptions): PackageInfo {
  if (publishInfo.tag === "Error")
    return errorPackageInfo(publishInfo.packageName);

  const { packageName, packagePublishDate, packageVersion, publishedTimes } =
    publishInfo;

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
