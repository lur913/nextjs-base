import type { NextConfig } from "next";
import createMDX from "@next/mdx";
// import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const options = { theme: 'github-dark-dimmed', keepBackground: false }

// export default nextConfig;
const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [['rehype-pretty-code', options]],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
