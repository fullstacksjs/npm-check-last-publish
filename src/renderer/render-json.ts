import type { PackageInfo } from "../models/package-info.ts";

export function renderJSON(objects: PackageInfo[]): string {
  return JSON.stringify(objects, null, 2);
}
