import { exec } from "node:child_process";
import util from "node:util";

type PackageVersionsDetail = {
  time: Record<string, string>;
  version: string;
};

const execPromise = util.promisify(exec);

export class PackageNotFoundError extends Error {
  public packageName: string;

  constructor(packageName: string) {
    super(`Package "${packageName}" not found on npm registry.`);
    this.name = "PackageNotFoundError";
    this.packageName = packageName;
  }
}

export const getPackageVersionsDetail = async (packageName: string) => {
  try {
    const { stdout: packageInfoStdout } = await execPromise(
      `npm view ${packageName} time version --json`,
    );

    const packageInfo: PackageVersionsDetail = JSON.parse(packageInfoStdout);
    return {
      packageVersion: packageInfo.version,
      publishedTimes: packageInfo.time,
    };
  } catch {
    throw new PackageNotFoundError(packageName);
  }
};
