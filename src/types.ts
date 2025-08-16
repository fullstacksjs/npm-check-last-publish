export type Area = "safe" | "warn" | "error";
export type TerminalColor = "green" | "yellow" | "red";

export type PackageInfo = {
  name: string;
  version: string;
  date: Date;
  diffDays: number;
  area: TerminalColor;
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
export interface Thresholds {
  warn: number;
  error: number;
}
