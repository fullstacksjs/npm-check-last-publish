import { exec } from "node:child_process";
import util from "node:util";

const execPromise = util.promisify(exec);

export const getPublishedTimes = async (packageName: string) => {
	const { stdout: publishedTimesStdout } = await execPromise(
		`npm view ${packageName} time --json`,
	);
	const publishedTimes: Record<string, string> =
		JSON.parse(publishedTimesStdout);
	return publishedTimes;
};
