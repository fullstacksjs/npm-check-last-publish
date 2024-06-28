import { exec } from "node:child_process";
import util from "node:util";
import ora from "ora";
import chalk from "chalk";
import { formatDistance } from "date-fns";

import fakePackageJSON from "../fake-package.json" assert { type: "json" };

const execPromise = util.promisify(exec);

type Area = "red" | "green" | "yellow";
type DependencyInfo = {
  name: string;
  version: string;
  date: string;
  diffDays: number;
  area: Area;
};

const RED_AREA = (target: number) => target > 365;
const YELLOW_AREA = (target: number) => target > 180;
const GREEN_AREA = (target: number) => target < 180;

const dependenciesInformation: DependencyInfo[] = [];

const spinner = ora("Loading...").start();

for (const packageName of Object.keys(fakePackageJSON.dependencies)) {
  const { stdout: packageVersionStdout } = await execPromise(
    `npm view ${packageName} version`
  );

  const packageVersion = packageVersionStdout.replace("\n", "");

  const { stdout: packagePublishDateListStdout } = await execPromise(
    `npm view ${packageName} time --json`
  );
  const packagePublishDateList: { [key: string]: string } = JSON.parse(
    packagePublishDateListStdout
  );

  const packagePublishDate = packagePublishDateList[packageVersion];

  const diffInTime =
    new Date().getTime() - new Date(packagePublishDate).getTime();
  const diffInDays = Math.round(diffInTime / (1000 * 3600 * 24));

  let area: Area = "red";

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

spinner.stop();
spinner.clear();

for (const dependencyInfo of dependenciesInformation) {
  const dependencieArea = chalk[dependencyInfo.area];

  const name = dependencieArea(dependencyInfo.name);
  const version = dependencieArea(dependencyInfo.version);
  const date = dependencieArea(
    formatDistance(dependencyInfo.date, new Date(), { addSuffix: true })
  );

  console.log(name.padEnd(30), version.padEnd(30), date.padEnd(30));
}
