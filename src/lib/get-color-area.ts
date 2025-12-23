import type { TerminalColor, Thresholds } from "../types.ts";

import { AREA_COLORS } from "./constants.ts";

export interface GetColorAreaOptions {
  diffDays: number;
  thresholds: Thresholds;
}

export function getColorArea({
  diffDays,
  thresholds,
}: GetColorAreaOptions): TerminalColor {
  const { critical, warn } = thresholds;
  if (diffDays >= critical) return AREA_COLORS.error;
  if (diffDays >= warn) return AREA_COLORS.warn;
  return AREA_COLORS.safe;
}
