export type Area = "red" | "green" | "yellow";

export type DependencyInfo = {
  name: string;
  version: string;
  date: string;
  diffDays: number;
  area: Area;
  averagePublishDays: number;
};
