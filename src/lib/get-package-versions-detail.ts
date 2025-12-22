import { exec } from "node:child_process";
import util from "node:util";
import * as z from "zod";

const execPromise = util.promisify(exec);

export class PackageNotFoundError extends Error {
  public packageName: string;

  constructor(packageName: string) {
    super(`Package "${packageName}" not found on npm registry.`);
    this.name = "PackageNotFoundError";
    this.packageName = packageName;
  }
}

const PackageVersionsDetailSchema = z.object({
  time: z.record(z.string(), z.string()),
  version: z.string(),
});

export const getPackageVersionsDetail = async (packageName: string) => {
  try {
    const { stdout: packageInfoStdout } = await execPromise(
      `npm view ${packageName} time version --json`,
    );

    const packageInfo = PackageVersionsDetailSchema.parse(
      JSON.parse(packageInfoStdout),
    );
    return {
      packageVersion: packageInfo.version,
      publishedTimes: packageInfo.time,
    };
  } catch {
    throw new PackageNotFoundError(packageName);
  }
};
