#!/usr/bin/env node

import "temporal-polyfill/global";
import { styleText } from "node:util";
import { getCliOptions } from "./lib/cli-options.ts";
import { fetchPackageInfoList } from "./lib/fetch-packages.ts";
import { processPackageData } from "./lib/process-packages.ts";
import { progressBar } from "./lib/progress-bar.ts";
import { mkRenderer } from "./renderer/mkRenderer.ts";

try {
  const { packages, sortBy, sortOrder, pattern, thresholds, output } =
    getCliOptions();

  const { results, errors } = await fetchPackageInfoList(packages, pattern);

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
