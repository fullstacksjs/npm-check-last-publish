#!/usr/bin/env node
import chalk from "chalk";
import { differenceInDays, formatDistance } from "date-fns";
import { GREEN_AREA, RED_AREA, YELLOW_AREA } from "./area.js";
import { getAllDependencies, getAveragePublishDays, getPackagePublishDate, loading, } from "./utils.js";
const allDependencies = await getAllDependencies();
const dependenciesInformation = [];
loading.start();
const dependenciesInfoPremissList = [];
for (const packageName of Object.keys(allDependencies)) {
    dependenciesInfoPremissList.push(getPackagePublishDate(packageName));
}
const infoList = await Promise.all(dependenciesInfoPremissList);
for (const packageInfo of infoList) {
    const { packagePublishDate, packageVersion, packageName, publishedTimes } = packageInfo;
    const averagePublishDays = getAveragePublishDays(publishedTimes);
    const diffDays = differenceInDays(new Date(), new Date(packagePublishDate));
    let area = "red";
    if (GREEN_AREA(diffDays))
        area = "green";
    if (YELLOW_AREA(diffDays))
        area = "yellow";
    if (RED_AREA(diffDays))
        area = "red";
    dependenciesInformation.push({
        name: packageName,
        version: packageVersion,
        date: packagePublishDate,
        diffDays,
        area,
        averagePublishDays,
    });
}
loading.stop();
for (const dependencyInfo of dependenciesInformation) {
    const dependencyArea = chalk[dependencyInfo.area];
    const { name, version, date, averagePublishDays } = dependencyInfo;
    const formattedDate = formatDistance(date, new Date(), {
        addSuffix: true,
    });
    console.log(dependencyArea(name.padEnd(30), version.padEnd(30), formattedDate.padEnd(30)), chalk.gray(`avg: every ${averagePublishDays} days`));
}
