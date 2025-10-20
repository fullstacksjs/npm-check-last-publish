import { getPackageVersionsDetail } from "./get-package-versions-detail.ts";

export const getPackagePublishDate = async (packageName: string) => {
  try {
    const { packageVersion, publishedTimes } =
      await getPackageVersionsDetail(packageName);
    const packagePublishDate = new Date(publishedTimes[packageVersion]);
    return { packagePublishDate, packageVersion, packageName, publishedTimes };
  } catch (error: unknown) {
    const e = error as Error;
    throw new Error(
      `Failed to fetch package info for "${packageName}": ${e.message}`,
    );
  }
};
