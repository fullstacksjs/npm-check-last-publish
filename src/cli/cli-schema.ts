import * as z from "zod";

import {
  VALID_OUTPUT,
  VALID_SORT_BY,
  VALID_SORT_ORDER,
} from "../lib/constants.ts";

export const cliSchema = z
  .object({
    sort: z.enum(VALID_SORT_BY),
    order: z.enum(VALID_SORT_ORDER),
    filter: z.string().optional(),
    warnDays: z
      .preprocess((val) => Number(val), z.number().int().nonnegative())
      .refine((n) => n >= 0, {
        message: "--warn-days must be a non-negative integer",
      }),
    errorDays: z
      .preprocess((val) => Number(val), z.number().int().nonnegative())
      .refine((n) => n >= 0, {
        message: "--error-days must be a non-negative integer",
      }),
    output: z.enum(VALID_OUTPUT),
  })
  .refine((data) => data.warnDays < data.errorDays, {
    message: "--warn-days must be less than --error-days",
    path: ["warnDays"],
  });
