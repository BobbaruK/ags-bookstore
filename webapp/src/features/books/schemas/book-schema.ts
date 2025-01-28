import { MAX_USERNAME, MIN_USERNAME } from "@/constants/misc";
import { z } from "zod";

export const BookSchema = z.object({
  title: z
    .string()
    .min(MIN_USERNAME, {
      message: `Title must be ${MIN_USERNAME} or more characters long`,
    })
    .max(MAX_USERNAME, {
      message: `Title must be ${MAX_USERNAME} or fewer characters long`,
    }),
  slug: z.string(),
  price: z.union([z.number().gt(0, "Must be greater than 0"), z.string()]),
  stock: z.union([z.number(), z.string()]),
  author: z.string().optional(),
});
