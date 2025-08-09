import { Command } from "commander";
import pkg from "../../package.json" with { type: "json" };
import type { SortBy, SortOrder } from "../types.js";

export function getCliOptions() {
  const program = new Command();

  program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)
    .usage("[packages...] [options]")
    .argument(
      "[packages...]",
      "Optional. Names of packages to check. If omitted, all local dependencies will be used.",
    )
    .option("--sort <TYPE>", "Sort by: name, date, or average", "date")
    .option("--order <DIRECTION>", "Sort order: asc or desc", "asc")
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

  const packages = program.args;
  const opts = program.opts();

  const sortBy = opts.sort.toLowerCase();
  const sortOrder = opts.order.toLowerCase();

  const validSortBy: SortBy[] = ["name", "date", "average"];
  const validSortOrder: SortOrder[] = ["asc", "desc"];

  if (!validSortBy.includes(sortBy)) {
    console.error(
      `Invalid --sort: '${sortBy}'. Must be one of: ${validSortBy.join(", ")}`,
    );
    process.exit(1);
  }

  if (!validSortOrder.includes(sortOrder)) {
    console.error(
      `Invalid --order: '${sortOrder}'. Must be ${validSortOrder.join(", ")}.`,
    );
    process.exit(1);
  }

  return {
    packages,
    sortBy: sortBy as SortBy,
    sortOrder: sortOrder as SortOrder,
  };
}
