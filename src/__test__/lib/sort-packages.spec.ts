import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { PackageInfo } from "../../models/package-info.ts";

import { sortPackages } from "../../lib/sort-packages.ts";

describe("sortPackages", () => {
  const mockPackages: PackageInfo[] = [
    {
      area: "green",
      name: "mock-alpha",
      version: "1.0.0",
      date: new Date("2024-01-01T12:00:00Z"),
      averagePublishDays: 10,
      diffDays: 5,
    },
    {
      area: "yellow",
      name: "mock-beta",
      version: "2.0.0",
      date: new Date("2024-06-01T12:00:00Z"),
      averagePublishDays: 20,
      diffDays: 15,
    },
    {
      area: "red",
      name: "mock-error",
      version: undefined,
      date: undefined,
      averagePublishDays: undefined,
      diffDays: undefined,
    },
  ];

  describe("sorting by name", () => {
    it("should sort ascending", () => {
      const result = sortPackages(mockPackages, "name", "asc");
      assert.deepStrictEqual(
        result.map((p) => p.name),
        ["mock-alpha", "mock-beta", "mock-error"],
      );
    });
    it("should sort descending", () => {
      const result = sortPackages(mockPackages, "name", "desc");
      assert.deepStrictEqual(
        result.map((p) => p.name),
        ["mock-error", "mock-beta", "mock-alpha"],
      );
    });
  });

  describe("sorting by averagePublishDays", () => {
    it("should sort ascending", () => {
      const result = sortPackages(mockPackages, "average", "asc");
      assert.deepStrictEqual(
        result.map((p) => p.name),
        ["mock-error", "mock-alpha", "mock-beta"],
      );
    });
    it("should sort descending", () => {
      const result = sortPackages(mockPackages, "average", "desc");

      assert.deepStrictEqual(
        result.map((p) => p.name),
        ["mock-beta", "mock-alpha", "mock-error"],
      );
    });
  });

  describe("sorting by date", () => {
    it("should sort ascending", () => {
      const result = sortPackages(mockPackages, "date", "asc");
      assert.deepStrictEqual(
        result.map((p) => p.name),
        ["mock-error", "mock-alpha", "mock-beta"],
      );
    });

    it("should sort descending", () => {
      const result = sortPackages(mockPackages, "date", "desc");
      assert.deepStrictEqual(
        result.map((p) => p.name),
        ["mock-beta", "mock-alpha", "mock-error"],
      );
    });
  });

  it("should handle empty list", () => {
    const result = sortPackages([], "date", "desc");
    assert.deepStrictEqual(result, []);
  });
});
