import type { PackageInfo } from "../types.ts";
import { renderCsv } from "./render-csv.ts";
import { renderJSON } from "./render-json.ts";
import { renderTable } from "./render-table.ts";

export type Renderer = (data: PackageInfo[]) => string;

const rendererMap: Record<string, Renderer> = {
  table: renderTable,
  csv: renderCsv,
  json: renderJSON,
};

export function mkRenderer(format: "table" | "csv" | "json"): Renderer {
  const renderer = rendererMap[format];
  if (!renderer) throw new Error(`Unsupported format: ${format}`);

  return renderer;
}
