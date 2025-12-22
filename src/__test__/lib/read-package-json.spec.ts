import assert from "node:assert";
import fsPromises, { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

import type { PackageJson } from "../../lib/read-package-json.ts";

import { readPackageJson } from "../../lib/read-package-json.ts";

describe("readPackageJson", () => {
  it("should parse package.json correctly", async () => {
    const contents = await readFile(
      new URL("../../../package.json", import.meta.url),
      { encoding: "utf8" },
    );
    const parsedContents = JSON.parse(contents) as PackageJson;

    const result = await readPackageJson();

    assert.deepStrictEqual(result, {
      dependencies: parsedContents.dependencies,
      devDependencies: parsedContents.devDependencies,
    });
  });

  it("should throw FILE_NOT_FOUND if file does not exist", async () => {
    fsPromises.readFile = () => {
      throw new Error("ENOENT: no such file or directory");
    };

    await assert.rejects(
      async () => {
        await readPackageJson();
      },
      (err) => err instanceof Error && err.message === "FILE_NOT_FOUND",
    );
  });
});
