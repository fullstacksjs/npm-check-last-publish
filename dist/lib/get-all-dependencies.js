import { readPackageJson } from "./read-package-json.js";
export const getAllDependencies = async () => {
    const packageJSON = await readPackageJson();
    const allDependencies = {
        ...packageJSON.dependencies,
        ...packageJSON.devDependencies,
    };
    return allDependencies;
};
