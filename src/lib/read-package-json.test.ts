import assert from "node:assert";
import { describe, it } from "node:test";
import { readPackageJson } from "./read-package-json.js";

describe("read-package-json.ts", () => {
	it("should read package.json and return an object", async () => {
		const packageJson = await readPackageJson();

		assert.ok(packageJson, "packageJson should not be null or undefined");
		assert.strictEqual(
			typeof packageJson,
			"object",
			"packageJson should be an object",
		);

		assert.ok(
			packageJson.dependencies,
			"packageJson should have a dependencies property",
		);

		assert.ok(
			packageJson.devDependencies,
			"packageJson should have a devDependencies property",
		);
	});
});
