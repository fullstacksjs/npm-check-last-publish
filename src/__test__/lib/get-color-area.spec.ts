import assert from "node:assert";
import { describe, it } from "node:test";

import type { Thresholds } from "../../types.ts";

import { getColorArea } from "../../lib/get-color-area.ts";

describe("getColorArea", () => {
  const thresholds: Thresholds = { warn: 50, critical: 100 };
  it("returns green when diffDays is below warn threshold", () => {
    assert.strictEqual(getColorArea({ diffDays: 1, thresholds }), "green");
  });

  it("returns yellow when diffDays is between warn and critical", () => {
    assert.strictEqual(getColorArea({ diffDays: 60, thresholds }), "yellow");
  });

  it("returns red when diffDays is equal or above critical", () => {
    assert.strictEqual(getColorArea({ diffDays: 110, thresholds }), "red");
  });
});
