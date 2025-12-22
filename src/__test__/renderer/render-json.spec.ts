import assert from "node:assert";
import { describe, it } from "node:test";

import type { PackageInfo } from "../../models/package-info.ts";

import { renderJSON } from "../../renderer/render-json.ts";

describe("renderJSON", () => {
  it("should render JSON with multiple objects", () => {
    const objects: PackageInfo[] = [
      {
        area: "green",
        name: "b",
        version: "1",
        date: new Date("2000-01-01T12:00:00Z"),
        averagePublishDays: 10,
        diffDays: 5,
      },
      {
        area: "red",
        name: "c",
        version: "1",
        date: new Date("2000-01-01T12:00:00Z"),
        averagePublishDays: 10,
        diffDays: 5,
      },
    ];

    const json = renderJSON(objects);
    const expected = JSON.stringify(objects, null, 2);
    assert.strictEqual(json, expected);
  });

  it("should handle empty array", () => {
    const json = renderJSON([]);
    const expected = JSON.stringify([], null, 2);
    assert.strictEqual(json, expected);
  });

  it("should handle single object", () => {
    const objects: PackageInfo[] = [
      {
        area: "green",
        name: "b",
        version: "1",
        date: new Date("2000-01-01T12:00:00Z"),
        averagePublishDays: 10,
        diffDays: 5,
      },
    ];

    const json = renderJSON(objects);
    const expected = JSON.stringify(objects, null, 2);
    assert.strictEqual(json, expected);
  });
});
