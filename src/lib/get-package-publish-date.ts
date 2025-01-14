import { getPackageVersionsDetail } from "./get-package-versions-detail.js";

export const getPackagePublishDate = async (packageName: string) => {
  const { packageVersion, publishedTimes } =
    await getPackageVersionsDetail(packageName);
  const packagePublishDate = new Date(publishedTimes[packageVersion]);
  return { packagePublishDate, packageVersion, packageName, publishedTimes };
};
