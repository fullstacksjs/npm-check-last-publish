import type { ForegroundColorName } from "chalk";

export type Area = string;

export type PackageInfo = {
  name: string;
  version: string;
  date: Date;
  diffDays: number;
  area: Area;
  averagePublishDays: number;
};

export type PackagePublishInfo = {
  packageName: string;
  packageVersion: string;
  packagePublishDate: Date;
  publishedTimes: Record<string, string>;
};

export type SortBy = "name" | "date" | "average";
export type SortOrder = "asc" | "desc";
export type ColorOption = ForegroundColorName | `#${string}`;
export interface Thresholds {
  warn: number;
  error: number;
}
export interface Colors {
  safe: ColorOption;
  warn: ColorOption;
  error: ColorOption;
}
