import type { TerminalColor, Thresholds } from "../types.js";
import { AREA_COLORS } from "./constants.js";
export interface GetColorAreaOptions {
  diffDays: number;
  thresholds: Thresholds;
}

export function getColorArea({
  diffDays,
  thresholds,
}: GetColorAreaOptions): TerminalColor {
  if (diffDays >= thresholds.error) return AREA_COLORS.error;
  if (diffDays >= thresholds.warn) return AREA_COLORS.warn;
  return AREA_COLORS.safe;
}
