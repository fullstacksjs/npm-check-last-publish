import chalk from "chalk";
import cliProgress from "cli-progress";

export const progressBar = new cliProgress.SingleBar(
  {
    format: `Loading ${chalk.cyanBright([
      "{bar}",
    ])} {percentage}% | {value}/{total} ${chalk.gray("packages")}`,
    hideCursor: true,
  },
  cliProgress.Presets.legacy,
);
