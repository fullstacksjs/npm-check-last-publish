import type { Area } from "./lib/get-color-area.js";

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
