import fsPromises from "node:fs/promises";
import chalk from "chalk";

export const readPackageJson = async () => {
  let packageContent: string;

  try {
    packageContent = await fsPromises.readFile("package.json", {
      encoding: "utf8",
    });
  } catch (_error) {
    console.log(
      chalk.redBright(
        `[ERROR]: Cannot find ${chalk.bold(
          "package.json",
        )}. Please ensure that the file exists in the project root. \n`,
      ),
    );
    return {};
  }

  const packageJSON: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  } = JSON.parse(packageContent);

  return packageJSON;
};
