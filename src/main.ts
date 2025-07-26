#!/usr/bin/env node

import chalk from "chalk";
import Table from "cli-table3";
import { differenceInDays, formatDistance } from "date-fns";

import { RED_AREA, YELLOW_AREA } from "./lib/area.js";
import { getAllDependencies } from "./lib/get-all-dependencies.js";
import { getAveragePublishDays } from "./lib/get-average-publish-days.js";
import { getPackagePublishDate } from "./lib/get-package-publish-date.js";
import { loading } from "./lib/loading.js";

import type { Area, DependencyInfo, PackagePublishInfo } from "./types.js";

async function getTargetPackages(cliArgs: string[]): Promise<string[]> {
  const allDependencies = await getAllDependencies();

  if (cliArgs.length === 0) {
    return Object.keys(allDependencies);
  }

  return cliArgs.map((arg) => arg.toLowerCase());
}

function getColorArea(diffDays: number): Area {
  if (YELLOW_AREA(diffDays)) return "yellow";
  if (RED_AREA(diffDays)) return "red";
  return "green";
}

function formatDependencyInfo(pkg: PackagePublishInfo): DependencyInfo {
  const diffDays = differenceInDays(new Date(), pkg.packagePublishDate);

  const averagePublishDays = getAveragePublishDays(pkg.publishedTimes);

  return {
    name: pkg.packageName,
    version: pkg.packageVersion,
    date: pkg.packagePublishDate,
    diffDays,
    area: getColorArea(diffDays),
    averagePublishDays,
  };
}

function renderTable(dependencies: DependencyInfo[]) {
  const table = new Table({
    head: [
      chalk.white("Name"),
      chalk.white("Version"),
      chalk.white("Date"),
      chalk.white("Average"),
    ],
  });

  for (const dep of dependencies) {
    const color = chalk[dep.area];
    const formattedDate = formatDistance(dep.date, new Date(), {
      addSuffix: true,
    });

    table.push([
      color(dep.name),
      color(dep.version),
      color(formattedDate),
      chalk.hex("#2dd4bf")(
        dep.averagePublishDays === 1
          ? "daily"
          : `every ${dep.averagePublishDays} days`,
      ),
    ]);
  }

  console.log(table.toString());
}

async function main() {
  const cliArgs = process.argv.slice(2).map((arg) => arg.toLowerCase());

  const packagesToCheck = await getTargetPackages(cliArgs);

  loading.start();

  const infoList = await Promise.all(
    packagesToCheck.map((pkg) => getPackagePublishDate(pkg)),
  );

  const dependenciesInfo = infoList
    .map(formatDependencyInfo)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  loading.stop();

  renderTable(dependenciesInfo);
}

main();
