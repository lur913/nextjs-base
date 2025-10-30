import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({children}) => (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      {children}
    </h1>
  ),
  ul: ({children}) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {children}
    </ul>
  )
};

export function useMDXComponents(): MDXComponents {
  return components;
}
