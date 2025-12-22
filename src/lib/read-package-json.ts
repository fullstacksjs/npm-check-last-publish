import fsPromises from "node:fs/promises";
import * as z from "zod";

const PackageJsonSchema = z.object({
  dependencies: z.record(z.string(), z.string()).optional(),
  devDependencies: z.record(z.string(), z.string()).optional(),
});

export type PackageJson = z.infer<typeof PackageJsonSchema>;

export const readPackageJson = async () => {
  let packageContent: string;

  try {
    packageContent = await fsPromises.readFile("package.json", {
      encoding: "utf8",
    });
  } catch (err) {
    throw new Error("FILE_NOT_FOUND", { cause: err });
  }

  const packageJSON = PackageJsonSchema.parse(JSON.parse(packageContent));

  return packageJSON;
};
