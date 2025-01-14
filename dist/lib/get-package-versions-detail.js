import { exec } from "node:child_process";
import util from "node:util";
const execPromise = util.promisify(exec);
export const getPackageVersionsDetail = async (packageName) => {
    const { stdout: packageInfoStdout } = await execPromise(`npm view ${packageName} time version --json`);
    const packageInfo = JSON.parse(packageInfoStdout);
    return {
        packageVersion: packageInfo.version,
        publishedTimes: packageInfo.time,
    };
};
