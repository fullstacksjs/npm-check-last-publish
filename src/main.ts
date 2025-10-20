#!/usr/bin/env node

import "temporal-polyfill/global";
import { styleText } from "node:util";
import { getCliOptions } from "./lib/cli-options.ts";
import { fetchPackageInfoList } from "./lib/fetch-packages.ts";
import { formatPackageInfo } from "./lib/format-package-info.ts";
import { getPackagePublishDate } from "./lib/get-package-publish-date.ts";
import { progressBar } from "./lib/progress-bar.ts";
import { sortPackages } from "./lib/sort-packages.ts";
import {
  errorPackagePublishInfo,
  type PackagePublishInfo,
} from "./models/package-publish-info.ts";
import { mkRenderer } from "./renderer/mkRenderer.ts";

try {
  const { packages, sortBy, sortOrder, filter, thresholds, output } =
    getCliOptions();
  let packagesToCheck: string[] = [];

  try {
    packagesToCheck = await fetchPackageInfoList(packages, filter);
  } catch (e) {
    if (e instanceof Error && e.message === "FILE_NOT_FOUND") {
      console.error(
        styleText(
          "redBright",
          `[ERROR]: Cannot find ${styleText(
            "bold",
            "package.json",
          )}. Please ensure that the file exists in your current working directory. \n`,
        ),
      );
      process.exit(1);
    }
    if (e instanceof Error && e.message === "NO_PACKAGE_FOUND") {
      console.error(
        styleText(
          "redBright",
          "[ERROR]: No matching packages found for given patterns.",
        ),
      );
      process.exit(1);
    }

    throw e;
  }

  progressBar.start(packagesToCheck.length, 0);
  const promises = packagesToCheck.map<Promise<PackagePublishInfo>>((pkgName) =>
    getPackagePublishDate(pkgName)
      .catch(() => errorPackagePublishInfo(pkgName))
      .finally(() => progressBar.increment()),
  );

  const results = await Promise.all(promises);
  progressBar.stop();

  const formatted = results.map((publishInfo) =>
    formatPackageInfo({ publishInfo, thresholds }),
  );

  const sortedInfo = sortPackages(formatted, sortBy, sortOrder);

  const render = mkRenderer(output);
  console.log(render(sortedInfo));

  const failedPackages = results.filter((info) => info.tag === "Error");

  if (failedPackages.length > 0) {
    process.exitCode = 1;
    console.error(
      styleText(
        "redBright",
        "\n[ERROR]: Could not retrieve publish date for the following packages:\n" +
          failedPackages.map((pkg) => `- ${pkg.packageName}`).join("\n"),
      ),
    );
  }
} catch (err) {
  progressBar.stop();
  console.error("Error:", err instanceof Error ? err.message : err);
  process.exit(1);
}
