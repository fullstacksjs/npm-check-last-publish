import { getAllDependencies } from "./get-all-dependencies.js";
import { getPackagePublishDate } from "./get-package-publish-date.js";

export async function fetchPackageInfoList(inputPackages: string[] = []) {
  const packagesToCheck =
    inputPackages.length === 0
      ? Object.keys(await getAllDependencies())
      : inputPackages.map((p) => p.toLowerCase());

  const errors: { package: string; error: Error }[] = [];

  const results = await Promise.all(
    packagesToCheck.map(async (pkgName) => {
      try {
        return await getPackagePublishDate(pkgName);
      } catch (err) {
        const message =
          err instanceof Error ? err.message.split("\n")[0] : String(err);

        errors.push({
          package: pkgName,
          error: new Error(message),
        });
        return null;
      }
    }),
  );

  return { results, errors };
}
