import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "../docs" }),
  schema: z.object({
    title: z.string().optional(),
    draft: z.boolean().optional(),
    // Add more fields as needed
  }),
});

export const collections = { docs };
