import { readPackageJson } from "./read-package-json.ts";

export const getAllDependencies = async () => {
  const packageJSON = await readPackageJson();

  const allDependencies = {
    ...packageJSON.dependencies,
    ...packageJSON.devDependencies,
  };

  return allDependencies;
};
