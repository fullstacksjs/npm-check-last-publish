import { styleText } from "node:util";
import type { PackagePublishInfo } from "../types.ts";
import { expandPackagePatterns } from "./expand-package-patterns.ts";
import { getPackagePublishDate } from "./get-package-publish-date.ts";
import { progressBar } from "./progress-bar.ts";
import { readPackageJson } from "./read-package-json.ts";

type PackageInfoResult = {
  results: (PackagePublishInfo | null)[];
  errors: { package: string; error: Error }[];
};

export async function fetchPackageInfoList(
  inputPackages: string[],
  filter: string,
): Promise<PackageInfoResult> {
  let packagesToCheck: string[];

  const shouldReadFromPackage = inputPackages.length === 0 || filter;
  if (shouldReadFromPackage) {
    try {
      const packageJSON = await readPackageJson();
      const allDependencies = {
        ...packageJSON.dependencies,
        ...packageJSON.devDependencies,
      };
      packagesToCheck = Object.keys(allDependencies);
      packagesToCheck = filter
        ? expandPackagePatterns(filter, packagesToCheck)
        : packagesToCheck;
    } catch (e) {
      if (e instanceof Error && e.message === "FILE_NOT_FOUND") {
        console.error(
          styleText(
            "redBright",
            `[ERROR]: Cannot find ${styleText(
              "bold",
              "package.json",
            )}. Please ensure that the file exists in your current working directory. \n`,
          ),
        );
        process.exit(1);
      }

      throw e;
    }
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
