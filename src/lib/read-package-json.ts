import fsPromises from "node:fs/promises";

export const readPackageJson = async () => {
  const packageJSON: {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  } = JSON.parse(
    await fsPromises.readFile("package.json", { encoding: "utf8" }),
  );

  return packageJSON;
};
