import assert from "node:assert";
import { afterEach, beforeEach, describe, it } from "node:test";

import { formatPackageInfo } from "../../lib/format-package-info.ts";

describe("formatPackageInfo", () => {
  const fixedNow = Temporal.PlainDate.from("2024-01-01T00:00:00+00:00[UTC]");

  let originalNow: typeof Temporal.Now.plainDateISO;

  beforeEach(() => {
    originalNow = Temporal.Now.plainDateISO;
    Temporal.Now.plainDateISO = () => fixedNow;
  });

  afterEach(() => {
    Temporal.Now.plainDateISO = originalNow;
  });

  it("should calculate averagePublishDays and diffDays correctly for OK tag", () => {
    const publishInfo = {
      tag: "OK",
      packageName: "my-package",
      packageVersion: "1.2.0",
      packagePublishDate: new Date("2023-12-25T00:00:00Z"),
      publishedTimes: {
        "v1.0.0": "2023-12-20T00:00:00Z",
        "v1.1.0": "2023-12-22T00:00:00Z",
        "v1.2.0": "2023-12-25T00:00:00Z",
      },
    } as const;

    const thresholds = { warn: 10, critical: 30 };

    const result = formatPackageInfo({ publishInfo, thresholds });

    const expected = {
      name: "my-package",
      version: "1.2.0",
      date: new Date("2023-12-25T00:00:00Z"),
      diffDays: 7,
      averagePublishDays: 3,
      area: "green",
    };

    assert.deepStrictEqual(result, expected);
  });

  it("should return errorPackagePublishInfo when tag is 'Error'", () => {
    const publishInfo = {
      tag: "Error",
      packageName: "name",
      packageVersion: "0.0.0",
      packagePublishDate: null,
      publishedTimes: {},
    } as const;

    const result = formatPackageInfo({
      publishInfo,
      thresholds: { warn: 10, critical: 30 },
    });

    assert.deepStrictEqual(result, {
      name: "name",
      version: undefined,
      date: undefined,
      diffDays: undefined,
      averagePublishDays: undefined,
      area: "red",
    });
  });
});
