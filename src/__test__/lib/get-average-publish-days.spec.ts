import assert from "node:assert";
import { describe, it } from "node:test";

import { getAveragePublishDays } from "../../lib/get-average-publish-days.ts";

describe("getAveragePublishDays", () => {
  it("should return the average days between publish dates", () => {
    const publishedTimes = {
      "v1.0.0": "2025-12-01T00:00:00Z",
      "v1.1.0": "2025-12-05T00:00:00Z",
      "v1.2.0": "2025-12-10T00:00:00Z",
    };

    const averageDays = getAveragePublishDays(publishedTimes);

    assert.strictEqual(averageDays, 5);
  });

  it("should return 0 if there is only one publish date", () => {
    const publishedTimes = {
      "v1.0.0": "2025-12-01T00:00:00Z",
    };

    const averageDays = getAveragePublishDays(publishedTimes);
    assert.strictEqual(averageDays, 0);
  });

  it("should return 0 for empty publish times", () => {
    const averageDays = getAveragePublishDays({});
    assert.strictEqual(averageDays, 0);
  });
});
