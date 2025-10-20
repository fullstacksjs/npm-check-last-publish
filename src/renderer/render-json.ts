import type { PackageInfo } from "../types.ts";

export function renderJSON(objects: PackageInfo[]): string {
  return JSON.stringify(objects, null, 2);
}
