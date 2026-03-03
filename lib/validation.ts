import { z } from "zod";

export const imdbSchema = z.string().regex(/^tt\d{7,8}$/, {
  message: "Invalid IMDb ID format",
});
