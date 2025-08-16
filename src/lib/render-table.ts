import chalk from "chalk";
import Table from "cli-table3";
import { formatDistance } from "date-fns";
import type { PackageInfo } from "../types.js";

const TABLE_HEADER_TITLES = ["Name", "Version", "Date", "Average"] as const;

export function renderTable(packagesInfo: PackageInfo[]) {
  const table = new Table({
    head: TABLE_HEADER_TITLES.map((title) => chalk.white(title)),
  });

  for (const pkg of packagesInfo) {
    const { area, averagePublishDays, date, name, version } = pkg;
    const color = chalk[area];
    const formattedDate = formatDistance(date, new Date(), {
      addSuffix: true,
    });

    table.push([
      color(name),
      color(version),
      color(formattedDate),
      chalk.hex("#2dd4bf")(
        averagePublishDays === 1 ? "daily" : `every ${averagePublishDays} days`,
      ),
    ]);
  }

  console.log(table.toString());
}
