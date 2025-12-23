import assert from "node:assert";
import { describe, it } from "node:test";

import {
  getPackageVersionsDetail,
  PackageNotFoundError,
} from "../../lib/get-package-versions-detail.ts";

describe("getPackageVersionsDetail", () => {
  it("should return package version and publishedTimes for an existing package", async () => {
    const result = await getPackageVersionsDetail("react");

    assert.ok(result.packageVersion, "packageVersion should be defined");
    assert.ok(result.publishedTimes, "publishedTimes should be defined");
  });

  it("should throw PackageNotFoundError for a non-existent package", async () => {
    await assert.rejects(
      () => getPackageVersionsDetail("test-does-not-exist-package-ever-123"),
      (err) =>
        err instanceof PackageNotFoundError &&
        err.packageName === "test-does-not-exist-package-ever-123",
    );
  });
});
