import assert from "node:assert";
import { describe, it } from "node:test";

import type { PackagePublishInfo } from "../../models/package-publish-info.ts";

import { getPackagePublishDate } from "../../lib/get-package-publish-date.ts";

describe("getPackagePublishDate - real npm", () => {
  it("should return PackagePublishInfo for an existing package", async () => {
    const result: PackagePublishInfo = await getPackagePublishDate("react");

    assert.ok(result.packageName === "react");
    assert.ok(result.packageVersion);
    assert.ok(result.packagePublishDate instanceof Date);
    assert.ok(Object.keys(result.publishedTimes).length > 0);
    assert.strictEqual(result.tag, "OK");
  });
});
