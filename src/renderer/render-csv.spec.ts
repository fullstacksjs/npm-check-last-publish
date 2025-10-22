import assert from "node:assert";
import { test } from "node:test";

import { renderCsv } from "./render-csv.ts";

test("should render csv with multiple objects", () => {
  const csv = renderCsv([
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
  ]);
  const lines = [
    "area,name,version,date,averagePublishDays,diffDays",
    "green,b,1,2000-01-01T12:00:00.000Z,10,5",
    "red,c,1,2000-01-01T12:00:00.000Z,10,5",
  ];
  assert.strictEqual(csv, lines.join("\n"));
});

test("should handles empty array", () => {
  const csv = renderCsv([]);
  const result = "";
  assert.strictEqual(csv, result);
});

test("should handles single object", () => {
  const csv = renderCsv([
    {
      area: "green",
      name: "b",
      version: "1",
      date: new Date("2000-01-01T12:00:00Z"),
      averagePublishDays: 10,
      diffDays: 5,
    },
  ]);
  const lines = [
    "area,name,version,date,averagePublishDays,diffDays",
    "green,b,1,2000-01-01T12:00:00.000Z,10,5",
  ];
  assert.strictEqual(csv, lines.join("\n"));
});
