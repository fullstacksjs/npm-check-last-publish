import { exec } from "node:child_process";
import fsPromises from "node:fs/promises";
import util from "node:util";
import ora from "ora";
const execPromise = util.promisify(exec);
const readPackageJson = async () => {
    const packageJSON = JSON.parse(await fsPromises.readFile("package.json", {
        encoding: "utf8",
    }));
    return packageJSON;
};
export const getAllDependencies = async () => {
    const packageJSON = await readPackageJson();
    const allDependencies = {
        ...packageJSON.dependencies,
        ...packageJSON.devDependencies,
    };
    return allDependencies;
};
export const getPackageVersion = async (packageName) => {
    const { stdout: packageVersionStdout } = await execPromise(`npm view ${packageName} version`);
    const packageVersion = packageVersionStdout.replace("\n", "");
    return packageVersion;
};
export const getPublishedTimes = async (packageName) => {
    const { stdout: publishedTimesStdout } = await execPromise(`npm view ${packageName} time --json`);
    const publishedTimes = JSON.parse(publishedTimesStdout);
    return publishedTimes;
};
export const getPackagePublishDate = async (packageName) => {
    const packageVersion = await getPackageVersion(packageName);
    const publishedTimes = await getPublishedTimes(packageName);
    const packagePublishDate = publishedTimes[packageVersion];
    return { packagePublishDate, packageVersion, packageName };
};
let oraSpinner = null;
export const loading = {
    start() {
        console.time();
        oraSpinner = ora("Loading...").start();
    },
    stop() {
        oraSpinner?.stop();
        oraSpinner?.clear();
        console.timeEnd();
    },
};
