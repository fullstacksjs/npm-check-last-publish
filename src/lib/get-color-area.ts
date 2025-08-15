import type { Area, Colors, Thresholds } from "../types.js";
export interface GetColorAreaOptions {
  diffDays: number;
  thresholds: Thresholds;
  colors: Colors;
}

export function getColorArea({
  diffDays,
  thresholds,
  colors,
}: GetColorAreaOptions): Area {
  if (diffDays >= thresholds.error) return colors.error;
  if (diffDays >= thresholds.warn) return colors.warn;
  return colors.safe;
}
