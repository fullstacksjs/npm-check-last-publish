import { differenceInDays } from "date-fns";
import type { PackageInfo, PackagePublishInfo, Thresholds } from "../types.js";
import { getAveragePublishDays } from "./get-average-publish-days.js";
import { getColorArea } from "./get-color-area.js";

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

  const diffDays = differenceInDays(new Date(), packagePublishDate);
  const averagePublishDays = getAveragePublishDays(publishedTimes);

  return {
    name: packageName,
    version: packageVersion,
    date: packagePublishDate,
    diffDays,
    area: getColorArea({ diffDays, thresholds }),
    averagePublishDays,
  };
}
