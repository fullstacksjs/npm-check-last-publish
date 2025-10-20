import type { PackagePublishInfo } from "../types.ts";
import { expandPackagePatterns } from "./expand-package-patterns.ts";
import { getAllDependencies } from "./get-all-dependencies.ts";
import { getPackagePublishDate } from "./get-package-publish-date.ts";
import { progressBar } from "./progress-bar.ts";

type PackageInfoResult = {
  results: (PackagePublishInfo | null)[];
  errors: { package: string; error: Error }[];
};

export async function fetchPackageInfoList(
  inputPackages: string[],
  pattern: boolean,
): Promise<PackageInfoResult> {
  const allDeps = await getAllDependencies();
  const allPackageNames = Object.keys(allDeps);

  let packagesToCheck: string[];

  if (inputPackages.length === 0) {
    packagesToCheck = allPackageNames;
  } else if (pattern) {
    packagesToCheck = expandPackagePatterns(inputPackages, allPackageNames);
  } else {
    packagesToCheck = inputPackages.map((p) => p.toLowerCase());
  }

  if (packagesToCheck.length === 0) {
    throw new Error("No matching packages found for given patterns.");
  }

  const errors: { package: string; error: Error }[] = [];
  const results: (PackagePublishInfo | null)[] = [];

  progressBar.start(packagesToCheck.length, 0);

  for (const pkgName of packagesToCheck) {
    try {
      const info = await getPackagePublishDate(pkgName);
      results.push(info);
    } catch (err) {
      const message =
        err instanceof Error ? err.message.split("\n")[0] : String(err);
      errors.push({ package: pkgName, error: new Error(message) });
      results.push(null);
    }
    progressBar.increment();
  }

  progressBar.stop();

  return { results, errors };
}
