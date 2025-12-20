export function expandPackagePatterns(
  pattern: string,
  allNames: string[],
): string[] {
  const matched = allNames.filter((pkg) => {
    return new RegExp(pattern).test(pkg);
  });

  return [...new Set(matched)];
}
