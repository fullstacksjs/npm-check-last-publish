import assert from "node:assert";
import { afterEach, beforeEach, describe, it } from "node:test";

import type { PackageInfo } from "../../models/package-info.ts";

import { renderTable } from "../../renderer/render-table.ts";

describe("renderTable", () => {
  const fixedNow = Temporal.ZonedDateTime.from(
    "2024-01-01T00:00:00+00:00[UTC]",
  );

  let originalNow: typeof Temporal.Now.zonedDateTimeISO;

  beforeEach(() => {
    originalNow = Temporal.Now.zonedDateTimeISO;
    Temporal.Now.zonedDateTimeISO = () => fixedNow;
  });

  afterEach(() => {
    Temporal.Now.zonedDateTimeISO = originalNow;
  });

  const pkg: PackageInfo = {
    area: "green",
    name: "packageA",
    version: "1.0.0",
    date: new Date("2025-01-01T00:00:00Z"),
    averagePublishDays: 10,
    diffDays: 5,
  };

  it("should include package info in table output", () => {
    const output = renderTable([pkg]);

    assert.ok(output.includes(pkg.name));
    assert.ok(output.includes(pkg.version));
    assert.ok(output.includes("every 10 days"));
    assert.ok(output.includes("next year"));
  });

  it("should handle empty array", () => {
    const output = renderTable([]);
    assert.ok(typeof output === "string");
  });
});
