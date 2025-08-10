import { minimatch } from "minimatch";

export function expandPackagePatterns(
  patterns: string[],
  allNames: string[],
): string[] {
  const matched = patterns.flatMap((pattern) => {
    if (pattern.includes("*")) {
      return allNames.filter((pkg) =>
        minimatch(pkg, pattern, { nocase: true }),
      );
    }
    return [pattern.toLowerCase()];
  });
  return [...new Set(matched)];
}
