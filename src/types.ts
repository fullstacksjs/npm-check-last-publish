export type Area = "safe" | "warn" | "error";
export type TerminalColor = "green" | "yellow" | "red";

export type SortBy = "name" | "date" | "average";
export type SortOrder = "asc" | "desc";
export type Output = "table" | "json" | "csv";
export interface Thresholds {
  warn: number;
  critical: number;
}
