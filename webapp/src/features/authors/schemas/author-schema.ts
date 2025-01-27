import { MAX_USERNAME, MIN_USERNAME } from "@/constants/misc";
import { z } from "zod";

export const AuthorSchema = z.object({
  firstName: z
    .string()
    .min(MIN_USERNAME, {
      message: `Title must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Title must be ${MAX_USERNAME} or fewer characters long`,
    }),
  lastName: z
    .string()
    .min(MIN_USERNAME, {
      message: `Title must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Title must be ${MAX_USERNAME} or fewer characters long`,
    }),
  slug: z.string(),
});
