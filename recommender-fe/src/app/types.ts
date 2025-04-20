import { z } from "zod";

export const SimilarBooksRequestSchema = z.object({
  query: z.string().min(1, "Query must not be empty"),
  top_k: z.number().int().positive().optional(),
});
export type SimilarBooksRequest = z.infer<typeof SimilarBooksRequestSchema>;

export const BookSchema = z.object({
  id: z.number(),
  title: z.string(),
  authors: z.string(),
  category: z.string(),
  description: z.string(),
});
export const SimilarBooksResponseSchema = z.array(BookSchema);
export type Book = z.infer<typeof BookSchema>;
export type SimilarBooksResponse = z.infer<typeof SimilarBooksResponseSchema>;
