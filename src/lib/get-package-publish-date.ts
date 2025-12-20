import type { PackagePublishInfo } from "../models/package-publish-info.ts";

import { getPackageVersionsDetail } from "./get-package-versions-detail.ts";

export const getPackagePublishDate = async (
  packageName: string,
): Promise<PackagePublishInfo> => {
  const { packageVersion, publishedTimes } =
    await getPackageVersionsDetail(packageName);
  const packagePublishDate = new Date(publishedTimes[packageVersion]);

  return {
    tag: "OK",
    packagePublishDate,
    packageVersion,
    packageName,
    publishedTimes,
  };
};
