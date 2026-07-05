import { z } from "zod";

export const programming_languages_schema = z.object({
  programming_language: z.string(),
  description: z.string(),
  code: z.object({
    what_this_code_does: z.string(),
    code_snippet: z.string(),
    version: z.number().optional(),
  }),
  companies_using: z.array(z.string()),
});
