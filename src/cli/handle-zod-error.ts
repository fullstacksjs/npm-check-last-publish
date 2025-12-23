/* eslint-disable no-console */
import type * as z from "zod";

export function handleZodError(error: z.ZodError): never {
  console.error("\n❌ Invalid CLI options:\n");

  for (const issue of error.issues) {
    const path = issue.path.join(".");
    const flag = `--${path}`;

    console.error(`  • ${flag}: ${issue.message}`);
  }

  console.error("\nRun with --help to see valid options.\n");
  process.exit(1);
}
