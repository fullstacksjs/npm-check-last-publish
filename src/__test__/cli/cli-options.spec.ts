import assert from "node:assert";
import { describe, it } from "node:test";

import { getCliOptions } from "../../cli/cli-options.ts";

describe("getCliOptions", () => {
  it("should parse defaults when no args are given", () => {
    const options = getCliOptions();

    assert.ok(Array.isArray(options.packages) && options.packages.length === 0);
    assert.strictEqual(options.sortBy, "date");
    assert.strictEqual(options.sortOrder, "asc");
    assert.strictEqual(options.filter, undefined);
    assert.deepStrictEqual(options.thresholds, { warn: 180, critical: 365 });
    assert.strictEqual(options.output, "table");
  });

  it("should parse packages and options correctly", () => {
    process.argv = [
      "node",
      "script.js",
      "react",
      "typescript",
      "--sort",
      "name",
      "--order",
      "asc",
      "--filter",
      "^react.*s$",
      "--warn-days",
      "50",
      "--error-days",
      "100",
      "--output",
      "json",
    ];

    const options = getCliOptions();

    assert.deepStrictEqual(options.packages, ["react", "typescript"]);
    assert.strictEqual(options.sortBy, "name");
    assert.strictEqual(options.sortOrder, "asc");
    assert.strictEqual(options.filter, "^react.*s$");
    assert.deepStrictEqual(options.thresholds, { warn: 50, critical: 100 });
    assert.strictEqual(options.output, "json");
  });

  it("should exit on invalid options", () => {
    process.argv = [
      "node",
      "script.js",
      "--warn-days",
      "200",
      "--error-days",
      "100",
    ];

    let exited = false;
    const originalExit = process.exit();

    process.exit = () => {
      exited = true;
      throw new Error("process.exit called");
    };

    try {
      assert.throws(() => getCliOptions());
    } finally {
      process.exit = originalExit;
    }

    assert.ok(exited, "process.exit should have been called");
  });
});
