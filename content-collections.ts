import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const posts = defineCollection({
  name: "posts",
  directory: "src/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    content: z.string(),
  }),
});

const blog = defineCollection({
  name: "blog",
  directory: "src/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    content: z.string(),
  }),
});

export default defineConfig({
  collections: [posts, blog],
});
