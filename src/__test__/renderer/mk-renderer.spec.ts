import assert from "node:assert";
import { describe, it } from "node:test";

import { mkRenderer } from "../../renderer/mk-renderer.ts";
import { renderCsv } from "../../renderer/render-csv.ts";
import { renderJSON } from "../../renderer/render-json.ts";
import { renderTable } from "../../renderer/render-table.ts";

describe("mkRenderer", () => {
  it("maps table to renderTable", () => {
    assert.strictEqual(mkRenderer("table"), renderTable);
  });

  it("maps csv to renderCsv", () => {
    assert.strictEqual(mkRenderer("csv"), renderCsv);
  });

  it("maps json to renderJSON", () => {
    assert.strictEqual(mkRenderer("json"), renderJSON);
  });
});
