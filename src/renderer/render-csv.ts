import type { PackageInfo } from "../types.ts";

export function renderCsv(objects: PackageInfo[]): string {
  if (Object.keys(objects).length === 0) {
    return "";
  }

  const header = Object.keys(objects[0]).join(",");
  const csvRows = objects
    .map((entry) =>
      Object.values(entry)
        .map((v) =>
          typeof v === "object" && v instanceof Date ? v.toISOString() : v,
        )
        .join(","),
    )
    .join("\n");

  return `${header}\n${csvRows}`;
}
