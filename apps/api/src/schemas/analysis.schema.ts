import { z } from "zod";

export const AnalyzeSchema = {
  body: z.object({
    text: z.string().min(1, "Text is required")
  })
};

export const HistoryQuerySchema = z.object({
  skip: z
    .string()
    .optional()
    .default("0")
    .transform((val) => parseInt(val, 10))
});