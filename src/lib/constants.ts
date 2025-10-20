import type {
  Area,
  Output,
  SortBy,
  SortOrder,
  TerminalColor,
  Thresholds,
} from "../types.ts";

export const DEFAULT_THRESHOLDS: Thresholds = {
  warn: 180,
  critical: 365,
};

export const AREA_COLORS: Record<Area, TerminalColor> = {
  safe: "green",
  warn: "yellow",
  error: "red",
} as const;

export const VALID_SORT_BY: SortBy[] = ["name", "date", "average"];
export const VALID_SORT_ORDER: SortOrder[] = ["asc", "desc"];
export const VALID_OUTPUT: Output[] = ["table", "json", "csv"];
export const DEFAULT_SORT: SortBy = "date";
export const DEFAULT_ORDER: SortOrder = "asc";
export const DEFAULT_OUTPUT: Output = "table";
