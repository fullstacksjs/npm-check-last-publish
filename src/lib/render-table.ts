import { styleText } from "node:util";
import Table from "cli-table3";
import type { PackageInfo } from "../types.ts";
import { formatRelativeTime } from "./format-relative-time.ts";

const TABLE_HEADER_TITLES = ["Name", "Version", "Date", "Average"] as const;

export function renderTable(packagesInfo: PackageInfo[]) {
  const table = new Table({
    head: TABLE_HEADER_TITLES.map((title) => styleText("white", title)),
  });

  for (const pkg of packagesInfo) {
    const { area, averagePublishDays, date, name, version } = pkg;

    const formattedDate = formatRelativeTime(date);

    table.push([
      styleText(area, name),
      styleText(area, version),
      styleText(area, formattedDate),
      styleText(
        "cyan",
        averagePublishDays === 1 ? "daily" : `every ${averagePublishDays} days`,
      ),
    ]);
  }

  console.log(table.toString());
}
