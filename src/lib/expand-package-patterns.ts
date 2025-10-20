import { globRegex } from "./glob-regex.ts";

export function expandPackagePatterns(
  pattern: string,
  allNames: string[],
): string[] {
  if (!pattern.includes("*")) return [pattern];

  const regex = globRegex(pattern);
  const matched = allNames.filter((pkg) => {
    return regex.test(pkg);
  });
  return [...new Set(matched)];
}
