import chalk from "chalk";
import cliProgress from "cli-progress";

export const progressBar = new cliProgress.SingleBar(
  {
    format: `${chalk.cyanBright(["{bar}"])} {percentage}% | {value}/{total}`,
    hideCursor: true,
  },
  cliProgress.Presets.legacy,
);
