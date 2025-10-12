/**
 * @reference https://github.com/aleclarson/glob-regex/blob/master/index.js
 */

const dotRE = /\./g;
const dotPattern = "\\.";

const restRE = /\*\*$/g;
const restPattern = "(.+)";

const globRE = /(?:\*\*\/|\*\*|\*)/g;
const globPatterns = {
  "*": "([^/]+)", // no backslashes
  "**": "(.+/)?([^/]+)", // short for "**/*"
  "**/": "(.+/)?", // one or more directories
};

function mapToPattern(str: string) {
  return globPatterns[str as keyof typeof globPatterns];
}

function replace(glob: string) {
  return glob
    .replace(dotRE, dotPattern)
    .replace(restRE, restPattern)
    .replace(globRE, mapToPattern);
}

export function globRegex(glob: string) {
  return new RegExp(`^${replace(glob)}$`, "i");
}

globRegex.replace = replace;
