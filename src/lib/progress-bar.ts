import cliProgress from "cli-progress";
import { styleText } from "node:util";

export const progressBar = new cliProgress.SingleBar(
  {
    format: `${styleText("cyanBright", "{bar}")} {percentage}% | {value}/{total}`,
    hideCursor: true,
  },
  cliProgress.Presets.legacy,
);
