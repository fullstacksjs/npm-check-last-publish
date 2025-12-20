import type { TerminalColor } from "../types.ts";

export type PackageInfo =
  | {
      name: string;
      version: string;
      date: Date;
      diffDays: number;
      area: TerminalColor;
      averagePublishDays: number;
    }
  | {
      name: string;
      version: undefined;
      date: undefined;
      diffDays: undefined;
      area: "red";
      averagePublishDays: undefined;
    };

export const errorPackageInfo = (name: string): PackageInfo => {
  return {
    name,
    version: undefined,
    date: undefined,
    diffDays: undefined,
    area: "red",
    averagePublishDays: undefined,
  };
};
