import { getPackageVersion } from "./get-package-version.js";
import { getPublishedTimes } from "./get-published-times.js";
export const getPackagePublishDate = async (packageName) => {
    const packageVersion = await getPackageVersion(packageName);
    const publishedTimes = await getPublishedTimes(packageName);
    const packagePublishDate = new Date(publishedTimes[packageVersion]);
    return { packagePublishDate, packageVersion, packageName, publishedTimes };
};
