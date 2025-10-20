import { styleText } from "node:util";
import Table from "cli-table3";
import { formatRelativeTime } from "../lib/format-relative-time.ts";
import type { PackageInfo } from "../models/package-info.ts";

const TABLE_HEADER_TITLES = ["Name", "Version", "Date", "Average"] as const;

export function renderTable(packagesInfo: PackageInfo[]) {
  const table = new Table({
    head: TABLE_HEADER_TITLES.map((title) => styleText("white", title)),
  });

  for (const pkg of packagesInfo) {
    const { area, averagePublishDays, date, name, version } = pkg;

    const formattedDate = date ? formatRelativeTime(date) : "N/A";

    const averagePublishDaysText = averagePublishDays
      ? styleText(
          "cyan",
          averagePublishDays === 1
            ? "daily"
            : `every ${averagePublishDays} days`,
        )
      : styleText("red", "N/A");

    table.push([
      styleText(area, name),
      styleText(area, version ?? "N/A"),
      styleText(area, formattedDate),
      averagePublishDaysText,
    ]);
  }

  return table.toString();
}
