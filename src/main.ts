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
    const {
      packages,
      sortBy,
      sortOrder,
      pattern,
      thresholds,
      jsonExport,
      csvExport,
    } = getCliOptions();

    const { results, errors } = await fetchPackageInfoList(packages, pattern);

    const sortedInfo = processPackageData({
      results: results.filter((r) => r !== null),
      sortBy,
      sortOrder,
      thresholds,
    });

    if (csvExport) {
      const csvRows = [
        Object.keys(sortedInfo[0]),
        ...sortedInfo.map((info) => [
          info.name,
          info.version,
          info.date,
          info.diffDays,
          info.area,
          info.averagePublishDays,
        ]),
      ];
      const csvContent = csvRows.map((row) => row.join(",")).join("\n");
      console.log(csvContent);
    } else if (jsonExport) {
      console.log(JSON.stringify(sortedInfo, null, 2));
    } else {
      renderTable(sortedInfo);
    }

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
