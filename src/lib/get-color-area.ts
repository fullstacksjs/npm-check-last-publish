const THRESHOLDS = {
  green: 0,
  yellow: 180,
  red: 365,
} as const;

const COLORS = {
  green: "green",
  yellow: "yellow",
  red: "red",
} as const;

export type Area = (typeof COLORS)[keyof typeof COLORS];

export const GREEN_AREA = (target: number) => target >= THRESHOLDS.green;
export const YELLOW_AREA = (target: number) => target >= THRESHOLDS.yellow;
export const RED_AREA = (target: number) => target >= THRESHOLDS.red;

export function getColorArea(diffDays: number): Area {
  if (RED_AREA(diffDays)) return COLORS.red;
  if (YELLOW_AREA(diffDays)) return COLORS.yellow;
  if (GREEN_AREA(diffDays)) return COLORS.green;
  return COLORS.green;
}
