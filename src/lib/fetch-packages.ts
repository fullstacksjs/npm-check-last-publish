import { expandPackagePatterns } from "./expand-package-patterns.ts";
import { readPackageJson } from "./read-package-json.ts";

export class NoPackageFoundError extends Error {
  constructor() {
    super("No packages found to check.");
    this.name = "NoPackageFoundError";
  }
}

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
    throw new NoPackageFoundError();
  }

  return packagesToCheck;
}
