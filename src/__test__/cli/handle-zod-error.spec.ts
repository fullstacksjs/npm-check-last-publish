/* eslint-disable no-console */
import assert from "node:assert";
import { it } from "node:test";
import * as z from "zod";

import { handleZodError } from "../../cli/handle-zod-error.ts";

it("should log errors and call process.exit", () => {
  const logs: string[] = [];
  const originalConsole = console.error;
  console.error = (msg: string) => logs.push(msg);

  let exitCode = 0;
  const originalExit = process.exit();
  process.exit = ((code?: number) => {
    exitCode = code ?? 0;
    throw new Error();
  }) as never;

  const error = new z.ZodError([
    {
      code: "custom",
      path: ["warnDays"],
      message: "--warn-days must be a non-negative integer",
    },
  ]);

  assert.throws(() => handleZodError(error));
  assert.strictEqual(exitCode, 1);
  assert.ok(
    logs.some((l) =>
      l.includes("--warnDays: --warn-days must be a non-negative integer"),
    ),
  );

  console.error = originalConsole;
  process.exit = originalExit;
});
