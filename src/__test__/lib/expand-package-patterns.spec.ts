import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { expandPackagePatterns } from "../../lib/expand-package-patterns.ts";

describe("expandPackagePatterns", () => {
  const allNames: string[] = [
    "react",
    "react-dom",
    "redux",
    "zod",
    "lodash",
    "react-query",
    "react",
  ];

  it("matches packages using regex pattern", () => {
    const result = expandPackagePatterns("^react", allNames);

    assert.deepStrictEqual(result, ["react", "react-dom", "react-query"]);
  });

  it("returns empty array when nothing matches", () => {
    const result = expandPackagePatterns("^vue", allNames);

    assert.deepStrictEqual(result, []);
  });

  it("removes duplicate package names", () => {
    const result = expandPackagePatterns("^react$", allNames);

    assert.deepStrictEqual(result, ["react"]);
  });

  it("matches middle of string", () => {
    const result = expandPackagePatterns("dom", allNames);

    assert.deepStrictEqual(result, ["react-dom"]);
  });

  it("handles empty allNames array", () => {
    const result = expandPackagePatterns("react", []);

    assert.deepStrictEqual(result, []);
  });
});
