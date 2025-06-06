#!/usr/bin/env node

import chalk from "chalk";
import Table from "cli-table3";
import { differenceInDays, formatDistance } from "date-fns";

import { GREEN_AREA, RED_AREA, YELLOW_AREA } from "./lib/area.js";
import { getAllDependencies } from "./lib/get-all-dependencies.js";
import { getAveragePublishDays } from "./lib/get-average-publish-days.js";
import { getPackagePublishDate } from "./lib/get-package-publish-date.js";
import { loading } from "./lib/loading.js";
import type { Area, DependencyInfo } from "./types.js";

const allDependencies = await getAllDependencies();

const dependenciesInformation: DependencyInfo[] = [];

loading.start();

const dependenciesInfoPremissList: ReturnType<typeof getPackagePublishDate>[] =
  [];

for (const packageName of Object.keys(allDependencies)) {
  dependenciesInfoPremissList.push(getPackagePublishDate(packageName));
}

const infoList = await Promise.all(dependenciesInfoPremissList);

for (const packageInfo of infoList) {
  const { packagePublishDate, packageVersion, packageName, publishedTimes } =
    packageInfo;

  const averagePublishDays = getAveragePublishDays(publishedTimes);

  const diffDays = differenceInDays(new Date(), packagePublishDate);

  let area: Area = "red";

  if (GREEN_AREA(diffDays)) area = "green";
  if (YELLOW_AREA(diffDays)) area = "yellow";
  if (RED_AREA(diffDays)) area = "red";

  dependenciesInformation.push({
    name: packageName,
    version: packageVersion,
    date: packagePublishDate,
    diffDays,
    area,
    averagePublishDays,
  });
}

dependenciesInformation.sort((a, b) => a.date.getTime() - b.date.getTime());

loading.stop();

const table = new Table({
  head: [
    chalk.white("Name"),
    chalk.white("Version"),
    chalk.white("Date"),
    chalk.white("Average"),
  ],
});

for (const dependencyInfo of dependenciesInformation) {
  const dependencyArea = chalk[dependencyInfo.area];

  const { name, version, date, averagePublishDays } = dependencyInfo;

  const formattedDate = formatDistance(date, new Date(), {
    addSuffix: true,
  });

  table.push([
    dependencyArea(name),
    dependencyArea(version),
    dependencyArea(formattedDate),
    chalk.hex("#2dd4bf")(
      averagePublishDays === 1 ? "daily" : `every ${averagePublishDays} days`,
    ),
  ]);
}

console.log(table.toString());
