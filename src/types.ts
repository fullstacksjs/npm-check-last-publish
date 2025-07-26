export type Area = "red" | "green" | "yellow";

export type DependencyInfo = {
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
