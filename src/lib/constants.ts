import type { Colors, SortBy, SortOrder, Thresholds } from "../types.js";

export const DEFAULT_THRESHOLDS: Thresholds = {
  warn: 180,
  error: 365,
};

export const DEFAULT_COLORS: Colors = {
  safe: "green",
  warn: "yellow",
  error: "red",
};

export const VALID_SORT_BY: SortBy[] = ["name", "date", "average"];
export const VALID_SORT_ORDER: SortOrder[] = ["asc", "desc"];
export const DEFAULT_SORT: SortBy = "date";
export const DEFAULT_ORDER: SortOrder = "asc";
