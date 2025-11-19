import configuration from "../../content-collections.ts";
import { GetTypeByName } from "@content-collections/core";

export type Post = GetTypeByName<typeof configuration, "posts">;
export declare const allPosts: Array<Post>;

export type Blog = GetTypeByName<typeof configuration, "blog">;
export declare const allBlogs: Array<Blog>;

export {};
