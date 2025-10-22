export type Area = "error" | "safe" | "warn";
export type TerminalColor = "green" | "red" | "yellow";

export type SortBy = "average" | "date" | "name";
export type SortOrder = "asc" | "desc";
export type Output = "csv" | "json" | "table";
export interface Thresholds {
  warn: number;
  critical: number;
}
