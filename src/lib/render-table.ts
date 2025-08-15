import chalk, { type ForegroundColorName, foregroundColorNames } from "chalk";
import Table from "cli-table3";
import { formatDistance } from "date-fns";
import type { PackageInfo } from "../types.js";

export function getChalkColor(color: string): (text: string) => string {
  if (color.startsWith("#")) {
    return chalk.hex(color);
  }

  if (foregroundColorNames.includes(color as ForegroundColorName)) {
    return chalk[color as ForegroundColorName];
  }

  throw new Error(
    `Invalid color: '${color}'. Must be a valid chalk color name or hex code.`,
  );
}

const TABLE_HEADER_TITLES = ["Name", "Version", "Date", "Average"] as const;

export function renderTable(packagesInfo: PackageInfo[]) {
  const table = new Table({
    head: TABLE_HEADER_TITLES.map((title) => chalk.white(title)),
  });

  for (const pkg of packagesInfo) {
    const { area, averagePublishDays, date, name, version } = pkg;
    const colorFn = getChalkColor(area);
    const formattedDate = formatDistance(date, new Date(), {
      addSuffix: true,
    });

    table.push([
      colorFn(name),
      colorFn(version),
      colorFn(formattedDate),
      chalk.hex("#2dd4bf")(
        averagePublishDays === 1 ? "daily" : `every ${averagePublishDays} days`,
      ),
    ]);
  }

  console.log(table.toString());
}
