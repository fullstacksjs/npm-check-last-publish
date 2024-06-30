import assert from "node:assert";
import fsPromises from "node:fs/promises";
import { describe, it, mock } from "node:test";
import { readPackageJson } from "./read-package-json.js";
describe("read-package-json.ts", () => {
    it("should read the package.json file and parse it as JSON", async () => {
        const mockJson = JSON.stringify({
            dependencies: {
                chalk: "5.3.0",
            },
            devDependencies: {
                tsx: "4.15.8",
            },
        });
        mock.method(fsPromises, "readFile", () => {
            return mockJson;
        });
        assert.equal(JSON.stringify(await readPackageJson()), mockJson);
    });
    it("should throw an error if reading the file fails", () => {
        mock.method(fsPromises, "readFile", () => {
            throw new Error("Read error");
        });
        assert.rejects(async () => {
            await readPackageJson();
        }, { name: "Error", message: "Read error" });
    });
});
