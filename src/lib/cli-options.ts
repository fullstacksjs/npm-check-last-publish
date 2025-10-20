import { Command } from "commander";
import pkg from "../../package.json" with { type: "json" };
import type { Output, SortBy, SortOrder, Thresholds } from "../types.ts";
import {
  DEFAULT_ORDER,
  DEFAULT_OUTPUT,
  DEFAULT_SORT,
  DEFAULT_THRESHOLDS,
  VALID_OUTPUT,
  VALID_SORT_BY,
  VALID_SORT_ORDER,
} from "./constants.ts";

type CliOptions = {
  sort: SortBy;
  order: SortOrder;
  filter: string;
  warnDays: number;
  errorDays: number;
  output: Output;
};

export function getCliOptions() {
  const program = new Command()
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)
    .argument("[<packages>...]", "Optional. Names of packages to check.")
    .option(
      "--sort <TYPE>",
      `Sort by: ${VALID_SORT_BY.join(", ")}`,
      DEFAULT_SORT,
    )
    .option(
      "--order <DIRECTION>",
      `Sort order: ${VALID_SORT_ORDER.join(", ")}`,
      DEFAULT_ORDER,
    )
    .option(
      "--filter <FILTER>",
      "filter packages by wildcard pattern matching from package.json file",
    )
    .option(
      "--warn-days <NUMBER>",
      "Days threshold for warning",
      String(DEFAULT_THRESHOLDS.warn),
    )
    .option(
      "--error-days <NUMBER>",
      "Days threshold for critical",
      String(DEFAULT_THRESHOLDS.critical),
    )
    .option(
      "--output <OUTPUT>",
      `Output: ${VALID_OUTPUT.join(", ")}`,
      DEFAULT_OUTPUT,
    )
    .helpOption("-h, --help", "Show help")
    .addHelpText(
      "after",
      `
Examples:
  $ npm-check-last-publish --sort name --order asc
  $ npm-check-last-publish --sort average
  $ npm-check-last-publish --filter "@types/*"
  $ npm-check-last-publish --filter "react-*"
  $ npm-check-last-publish --warn-days 60 --error-days 120
  $ npm-check-last-publish --output json > report.json
  $ npm-check-last-publish --output csv > report.csv
`,
    )
    .parse(process.argv);

  const {
    sort,
    order,
    filter: pattern,
    warnDays,
    errorDays,
    output,
  } = program.opts<CliOptions>();

  const packages = program.args;

  const thresholds: Thresholds = {
    warn: warnDays,
    critical: errorDays,
  };

  return {
    packages,
    filter: pattern,
    sortBy: sort,
    sortOrder: order,
    thresholds,
    output,
  };
}
