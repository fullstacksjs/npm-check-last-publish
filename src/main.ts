#!/usr/bin/env node

import "temporal-polyfill/global";
import { styleText } from "node:util";
import { getCliOptions } from "./lib/cli-options.ts";
import { fetchPackageInfoList } from "./lib/fetch-packages.ts";
import { getPackagePublishDate } from "./lib/get-package-publish-date.ts";
import { processPackageData } from "./lib/process-packages.ts";
import { progressBar } from "./lib/progress-bar.ts";
import { mkRenderer } from "./renderer/mkRenderer.ts";
import type { PackagePublishInfo } from "./types.ts";

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

  const errors: { package: string; error: Error }[] = [];
  const results: (PackagePublishInfo | null)[] = [];

  progressBar.start(packagesToCheck.length, 0);
  const promises = packagesToCheck.map((pkgName) =>
    getPackagePublishDate(pkgName)
      .then(
        (info) => {
          results.push(info);
        },
        (err) => {
          const message =
            err instanceof Error ? err.message.split("\n")[0] : String(err);
          errors.push({ package: pkgName, error: new Error(message) });
          results.push(null);
        },
      )
      .finally(() => {
        progressBar.increment();
      }),
  );

  await Promise.all(promises);
  progressBar.stop();

  const sortedInfo = processPackageData({
    results: results.filter((r) => r !== null),
    sortBy,
    sortOrder,
    thresholds,
  });

  const render = mkRenderer(output);
  console.log(render(sortedInfo));

  if (errors.length > 0) {
    for (const { package: pkg, error } of errors) {
      console.warn(
        styleText(["black", "bgYellow"], " WARNING "),
        styleText("yellow", `${pkg}: ${error.message}\n`),
      );
    }
  }
} catch (err) {
  progressBar.stop();
  console.error("Error:", err instanceof Error ? err.message : err);
  process.exit(1);
}
