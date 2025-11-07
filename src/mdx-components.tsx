import type { MDXComponents } from "mdx/types";
import dynamic from "next/dynamic";

// Embedded components 内嵌的组件，可以直接在 mdx 文件中使用
const Alert = dynamic(() => import("@/components/Alert"), {ssr: true});

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
  ),
  pre: ({children}) => (
    <pre className="rounded-md bg-stone-900 p-4 overflow-x-auto my-4">
      {children}
    </pre>
  ),
  Alert
};

export function useMDXComponents(): MDXComponents {
  return components;
}
