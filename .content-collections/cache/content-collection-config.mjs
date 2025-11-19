// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
var posts = defineCollection({
  name: "posts",
  directory: "src/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    content: z.string()
  })
});
var blog = defineCollection({
  name: "blog",
  directory: "src/blog",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    content: z.string()
  })
});
var content_collections_default = defineConfig({
  collections: [posts, blog]
});
export {
  content_collections_default as default
};
