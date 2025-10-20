import { expandPackagePatterns } from "./expand-package-patterns.ts";
import { readPackageJson } from "./read-package-json.ts";

export async function fetchPackageInfoList(
  inputPackages: string[],
  filter: string,
): Promise<string[]> {
  let packagesToCheck: string[];

  const shouldReadFromPackage = inputPackages.length === 0 || filter;
  if (shouldReadFromPackage) {
    const packageJSON = await readPackageJson();
    const allDependencies = {
      ...packageJSON.dependencies,
      ...packageJSON.devDependencies,
    };
    packagesToCheck = Object.keys(allDependencies);
    packagesToCheck = filter
      ? expandPackagePatterns(filter, packagesToCheck)
      : packagesToCheck;
  } else {
    packagesToCheck = inputPackages.map((p) => p.toLowerCase());
  }

  if (packagesToCheck.length === 0) {
    throw new Error("NO_PACKAGE_FOUND");
  }

  return packagesToCheck;
}
