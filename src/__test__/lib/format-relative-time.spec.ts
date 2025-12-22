import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";

import { formatRelativeTime } from "../../lib/format-relative-time.ts";

describe("formatRelativeTime", () => {
  const fixedNow = Temporal.ZonedDateTime.from(
    "2025-01-01T00:00:00+00:00[UTC]",
  );

  let originalNow: typeof Temporal.Now.zonedDateTimeISO;

  beforeEach(() => {
    originalNow = Temporal.Now.zonedDateTimeISO;
    Temporal.Now.zonedDateTimeISO = () => fixedNow;
  });

  afterEach(() => {
    Temporal.Now.zonedDateTimeISO = originalNow;
  });

  it("formats seconds difference", () => {
    const date = new Date("2025-01-01T00:00:10Z");

    const result = formatRelativeTime(date);

    assert.equal(result, "in 10 seconds");
  });

  it("formats minutes difference", () => {
    const date = new Date("2025-01-01T00:05:00Z");

    const result = formatRelativeTime(date);

    assert.equal(result, "in 5 minutes");
  });

  it("formats hours difference", () => {
    const date = new Date("2025-01-01T03:00:00Z");

    const result = formatRelativeTime(date);

    assert.equal(result, "in 3 hours");
  });

  it("formats days difference", () => {
    const date = new Date("2025-01-03T00:00:00Z");

    const result = formatRelativeTime(date);

    assert.equal(result, "in 2 days");
  });

  it("formats months difference", () => {
    const date = new Date("2025-03-01T00:00:00Z");

    const result = formatRelativeTime(date);

    assert.equal(result, "in 2 months");
  });

  it("formats years difference", () => {
    const date = new Date("2027-01-01T00:00:00Z");

    const result = formatRelativeTime(date);

    assert.equal(result, "in 2 years");
  });

  it("formats past dates correctly", () => {
    const date = new Date("2024-12-31T23:59:30Z");

    const result = formatRelativeTime(date);

    assert.equal(result, "30 seconds ago");
  });
});
