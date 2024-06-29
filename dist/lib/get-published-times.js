import { exec } from "node:child_process";
import util from "node:util";
const execPromise = util.promisify(exec);
export const getPublishedTimes = async (packageName) => {
    const { stdout: publishedTimesStdout } = await execPromise(`npm view ${packageName} time --json`);
    const publishedTimes = JSON.parse(publishedTimesStdout);
    return publishedTimes;
};
