#!/usr/bin/env node

import "temporal-polyfill/global";
import { styleText } from "node:util";
import { getCliOptions } from "./lib/cli-options.js";
import { fetchPackageInfoList } from "./lib/fetch-packages.js";
import { processPackageData } from "./lib/process-packages.js";
import { progressBar } from "./lib/progress-bar.js";
import { renderTable } from "./lib/render-table.js";

async function main() {
  try {
    const { packages, sortBy, sortOrder, pattern, thresholds } =
      getCliOptions();

    const { results, errors } = await fetchPackageInfoList(packages, pattern);

    const sortedInfo = processPackageData({
      results: results.filter((r) => r !== null),
      sortBy,
      sortOrder,
      thresholds,
    });

    renderTable(sortedInfo);

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
}

main();
