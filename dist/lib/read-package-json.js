import fsPromises from "node:fs/promises";
export const readPackageJson = async () => {
    const packageJSON = JSON.parse(await fsPromises.readFile("package.json", {
        encoding: "utf8",
    }));
    return packageJSON;
};
