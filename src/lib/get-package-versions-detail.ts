import { exec } from "node:child_process";
import util from "node:util";

type PackageVersionsDetail = {
  time: Record<string, string>;
  version: string;
};

const execPromise = util.promisify(exec);

export const getPackageVersionsDetail = async (packageName: string) => {
  const { stdout: packageInfoStdout } = await execPromise(
    `npm view ${packageName} time version --json`,
  );
  const packageInfo: PackageVersionsDetail = JSON.parse(packageInfoStdout);
  return {
    packageVersion: packageInfo.version,
    publishedTimes: packageInfo.time,
  };
};
