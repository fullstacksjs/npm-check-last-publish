import { Command } from "commander";
import pkg from "../../package.json" with { type: "json" };
import type { SortBy, SortOrder } from "../types.js";

const VALID_SORT_BY: SortBy[] = ["name", "date", "average"];
const VALID_SORT_ORDER: SortOrder[] = ["asc", "desc"];

function validateOption<T extends string>(
  value: string,
  validValues: readonly T[],
  optionName: string,
): T {
  const lowerValue = value.toLowerCase() as T;
  if (!validValues.includes(lowerValue)) {
    console.error(
      `Invalid --${optionName}: '${value}'. Must be one of: ${validValues.join(", ")}`,
    );
    process.exit(1);
  }
  return lowerValue;
}

export function getCliOptions() {
  const program = new Command()
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)
    .usage("[packages...] [options]")
    .argument(
      "[packages...]",
      "Optional. Names of packages to check. If omitted, all local dependencies will be used.",
    )
    .option("--sort <TYPE>", `Sort by: ${VALID_SORT_BY.join(", ")}`, "date")
    .option(
      "--order <DIRECTION>",
      `Sort order: ${VALID_SORT_ORDER.join(", ")}`,
      "asc",
    )
    .helpOption("-h, --help", "Show help")
    .addHelpText(
      "after",
      `
Examples:
  $ npm-check-last-publish --sort name --order asc
  $ npm-check-last-publish --sort average
  $ npm-check-last-publish        # defaults to --sort date --order asc
`,
    )
    .parse(process.argv);

  const { sort, order } = program.opts<{ sort: SortBy; order: SortOrder }>();
  const packages = program.args;

  return {
    packages,
    sortBy: validateOption(sort, VALID_SORT_BY, "sort"),
    sortOrder: validateOption(order, VALID_SORT_ORDER, "order"),
  };
}
