import { differenceInDays } from "date-fns";
import type { PackageInfo, PackagePublishInfo } from "../types.js";
import { getAveragePublishDays } from "./get-average-publish-days.js";
import { getColorArea } from "./get-color-area.js";

export function formatPackageInfo(pkg: PackagePublishInfo): PackageInfo {
  const { packageName, packagePublishDate, packageVersion, publishedTimes } =
    pkg;

  const diffDays = differenceInDays(new Date(), packagePublishDate);
  const averagePublishDays = getAveragePublishDays(publishedTimes);

  return {
    name: packageName,
    version: packageVersion,
    date: packagePublishDate,
    diffDays,
    area: getColorArea(diffDays),
    averagePublishDays,
  };
}
