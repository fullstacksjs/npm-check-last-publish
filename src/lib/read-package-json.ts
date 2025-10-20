import fsPromises from "node:fs/promises";

export const readPackageJson = async () => {
  let packageContent: string;
  try {
    packageContent = await fsPromises.readFile("package.json", {
      encoding: "utf8",
    });
  } catch (err) {
    throw new Error("FILE_NOT_FOUND", { cause: err });
  }

  const packageJSON: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  } = JSON.parse(packageContent);

  return packageJSON;
};
