#!/usr/bin/env node

import { getCliOptions } from "./lib/cli-options.js";
import { formatPackageInfo } from "./lib/format-package-info.js";
import { getAllDependencies } from "./lib/get-all-dependencies.js";
import { getPackagePublishDate } from "./lib/get-package-publish-date.js";
import { loading } from "./lib/loading.js";
import { renderTable } from "./lib/render-table.js";

async function main() {
  try {
    const { packages } = getCliOptions();

    const packagesToCheck =
      packages.length === 0
        ? Object.keys(await getAllDependencies())
        : packages.map((p) => p.toLowerCase());

    loading.start();

    const infoList = await Promise.all(
      packagesToCheck.map(getPackagePublishDate),
    );

    const sortedDependencies = infoList
      .map(formatPackageInfo)
      .sort((a, b) => a.date.getTime() - b.date.getTime());

    loading.stop();

    renderTable(sortedDependencies);
  } catch (err) {
    loading.stop();
    console.error("Error:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
}

main();
