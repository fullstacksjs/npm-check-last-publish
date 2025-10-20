import { styleText } from "node:util";
import { createLogUpdate } from "log-update";

export const getProgressBar = (total: number) => {
  const logUpdate = createLogUpdate(process.stdout);

  let current = 0;
  const barLength = 40;

  return {
    increment: () => {
      current += 1;
      const percentage = Math.round((current / total) * 100);
      const filledLength = Math.round((barLength * current) / total);
      const bar = `${styleText("cyanBright", "=").repeat(filledLength)}${styleText("cyanBright", "-").repeat(barLength - filledLength)}`;

      logUpdate(`${bar} ${percentage}% | ${current}/${total}`);
    },
    stop: () => {
      current = 0;
      logUpdate.clear();
    },
  };
};
