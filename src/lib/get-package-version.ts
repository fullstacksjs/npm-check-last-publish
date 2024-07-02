import { exec } from "node:child_process";
import util from "node:util";

const execPromise = util.promisify(exec);

export const getPackageVersion = async (packageName: string) => {
  const { stdout: packageVersionStdout } = await execPromise(
    `npm view ${packageName} version`,
  );
  const packageVersion = packageVersionStdout.replace("\n", "");
  return packageVersion;
};
