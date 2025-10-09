import { styleText } from "node:util";
import cliProgress from "cli-progress";

export const progressBar = new cliProgress.SingleBar(
  {
    format: `${styleText("cyanBright", "{bar}")} {percentage}% | {value}/{total}`,
    hideCursor: true,
  },
  cliProgress.Presets.legacy,
);
