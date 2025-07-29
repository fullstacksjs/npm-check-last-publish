import { Command } from "commander";
import pkg from "../../package.json" with { type: "json" };

export function getCliOptions() {
  const program = new Command();

  program
    .name(pkg.name)
    .description(pkg.description)
    .version(pkg.version)
    .usage("[packages...]")
    .argument(
      "[packages...]",
      "Optional. Names of packages to check. If omitted, all local dependencies will be used.",
    )
    .helpOption("-h, --help", "show help")
    .addHelpText("after", "\nExample:\n  $ npm-check-last-publish react zod")
    .parse(process.argv);

  const packages = program.args;

  return { packages };
}
