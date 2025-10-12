import { globRegex } from "./glob-regex.js";

export function expandPackagePatterns(
  patterns: string[],
  allNames: string[],
): string[] {
  const matched = patterns.flatMap((pattern) => {
    if (pattern.includes("*")) {
      const regex = globRegex(pattern);
      return allNames.filter((pkg) => {
        return regex.test(pkg);
      });
    }
    return [pattern.toLowerCase()];
  });
  return [...new Set(matched)];
}
