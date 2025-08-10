#!/usr/bin/env node

import chalk from "chalk";
import { getCliOptions } from "./lib/cli-options.js";
import { fetchPackageInfoList } from "./lib/fetch-packages.js";
import { loading } from "./lib/loading.js";
import { processPackageData } from "./lib/process-packages.js";
import { renderTable } from "./lib/render-table.js";

async function main() {
  try {
    const { packages, sortBy, sortOrder, pattern } = getCliOptions();

    loading.start();

    const { results, errors } = await fetchPackageInfoList(packages, pattern);
    loading.stop();

    const sortedInfo = processPackageData(
      results.filter((r) => r !== null),
      sortBy,
      sortOrder,
    );

    renderTable(sortedInfo);

    if (errors.length > 0) {
      for (const { package: pkg, error } of errors) {
        console.warn(`  - ${chalk.bold(pkg)}: ${error.message}`);
      }
    }
  } catch (err) {
    loading.stop();
    console.error("Error:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
