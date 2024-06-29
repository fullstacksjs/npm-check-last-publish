#!/usr/bin/env node
import chalk from "chalk";
import { differenceInDays, formatDistance } from "date-fns";
import { GREEN_AREA, RED_AREA, YELLOW_AREA } from "./area.js";
import { getAllDependencies, getPackagePublishDate, loading } from "./utils.js";
const allDependencies = await getAllDependencies();
const dependenciesInformation = [];
loading.start();
const dependenciesInfoPremissList = [];
for (const packageName of Object.keys(allDependencies)) {
	dependenciesInfoPremissList.push(getPackagePublishDate(packageName));
}
const infoList = await Promise.all(dependenciesInfoPremissList);
for (const packageInfo of infoList) {
	const { packagePublishDate, packageVersion, packageName } = packageInfo;
	const diffInDays = differenceInDays(new Date(), new Date(packagePublishDate));
	let area = "red";
	if (GREEN_AREA(diffInDays)) area = "green";
	if (YELLOW_AREA(diffInDays)) area = "yellow";
	if (RED_AREA(diffInDays)) area = "red";
	dependenciesInformation.push({
		name: packageName,
		version: packageVersion,
		date: packagePublishDate,
		diffDays: diffInDays,
		area: area,
	});
}
loading.stop();
for (const dependencyInfo of dependenciesInformation) {
	const dependencyArea = chalk[dependencyInfo.area];
	const { name, version, date } = dependencyInfo;
	const formattedDate = formatDistance(date, new Date(), {
		addSuffix: true,
	});
	console.log(
		dependencyArea(
			name.padEnd(30),
			version.padEnd(30),
			formattedDate.padEnd(30),
		),
	);
}
