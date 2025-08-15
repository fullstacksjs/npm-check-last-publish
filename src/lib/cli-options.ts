import { foregroundColorNames } from "chalk";
import { Command } from "commander";
import pkg from "../../package.json" with { type: "json" };
import type {
  ColorOption,
  Colors,
  SortBy,
  SortOrder,
  Thresholds,
} from "../types.js";
import {
  DEFAULT_COLORS,
  DEFAULT_ORDER,
  DEFAULT_SORT,
  DEFAULT_THRESHOLDS,
  VALID_SORT_BY,
  VALID_SORT_ORDER,
} from "./constants.js";

export function getCliOptions() {
  const program = new Command()
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)
    .usage("[packages...] [options]")
    .argument("[packages...]", "Optional. Names of packages to check.")
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
    .option("--pattern", "Enable wildcard pattern matching for package names")
    .option(
      "--warn-days <NUMBER>",
      "Days threshold for warning",
      String(DEFAULT_THRESHOLDS.warn),
    )
    .option(
      "--error-days <NUMBER>",
      "Days threshold for error",
      String(DEFAULT_THRESHOLDS.error),
    )
    .option(
      "--safe-color <COLOR>",
      `Color for safe zone (hex like "#00ff00" or one of: ${foregroundColorNames.join(", ")})`,
      DEFAULT_COLORS.safe,
    )
    .option(
      "--warn-color <COLOR>",
      `Color for warning zone (hex like "#ffcc00" or one of: ${foregroundColorNames.join(", ")})`,
      DEFAULT_COLORS.warn,
    )
    .option(
      "--error-color <COLOR>",
      `Color for error zone (hex like "#ff0000" or one of: ${foregroundColorNames.join(", ")})`,
      DEFAULT_COLORS.error,
    )
    .helpOption("-h, --help", "Show help")
    .addHelpText(
      "after",
      `
Examples:
  $ npm-check-last-publish --sort name --order asc
  $ npm-check-last-publish --sort average
  $ npm-check-last-publish        # defaults to --sort date --order asc
  $ npm-check-last-publish --pattern "@types/*"
  $ npm-check-last-publish --pattern "react-*"
  $ npm-check-last-publish --warn-days 60 --error-days 120
  $ npm-check-last-publish --safe-color green --warn-color yellow --error-color red
  $ npm-check-last-publish --safe-color "#00ff00" --warn-color "#ffff00" --error-color "#ff0000"
`,
    )
    .parse(process.argv);

  const {
    sort,
    order,
    pattern,
    warnDays,
    errorDays,
    safeColor,
    warnColor,
    errorColor,
  } = program.opts<{
    sort: SortBy;
    order: SortOrder;
    pattern: boolean;
    warnDays: number;
    errorDays: number;
    safeColor: ColorOption;
    warnColor: ColorOption;
    errorColor: ColorOption;
  }>();

  const packages = program.args;

  const thresholds: Thresholds = {
    warn: warnDays,
    error: errorDays,
  };

  const colors: Colors = {
    safe: safeColor,
    warn: warnColor,
    error: errorColor,
  };

  return {
    packages,
    pattern,
    sortBy: sort,
    sortOrder: order,
    thresholds,
    colors,
  };
}
