export type Area = "red" | "green" | "yellow";

export type DependencyInfo = {
  name: string;
  version: string;
  date: Date;
  diffDays: number;
  area: Area;
  averagePublishDays: number;
};
