import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { z } from "astro:content";
const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "../docs" }),
  schema: z.object({
    title: z.string().optional(),
    draft: z.boolean().optional(),
    // Add more fields as needed
  }),
});

export const collections = { docs };
