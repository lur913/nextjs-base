import { docs } from "fumadocs-mdx:collections/server";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";

/**
 * source 携带的参数说明：
 * generateParams: ƒ ()
 * getLanguages: ƒ ()
 * getNodeMeta: ƒ ()
 * getNodePage: ƒ ()
 * getPage: ƒ ()
 * getPageByHref: ƒ ()
 * getPageTree: ƒ ()
 * getPages: ƒ ()
 * pageTree: Object
 * 
 */

/**
 * docs 属性说明
 * - docs: Array
 * - meta: Array
 * - toFumadocsSource: function
 */

/**
 * docs.docs 数组中每一项的属性说明
 * _exports: {
 *  default: MDXComponent 组件
 *  frontmatter: Object
 *  structuredData: Object
 *  toc: Array
 * }
 * body: MDXComponent 组件
 * structuredData: Object
 * toc: Array
 * getMDAST: function
 * getText: function
 * info: Object
 * 然后是 frontmatter 中展开的属性
 */

export default function Page() {
  console.log(333, source);
  console.log(444, docs);
  console.log(111, docs.docs);
  if (docs.docs.length === 0) {
    notFound();
  }
  const page = docs.docs[0];
  console.log(222, page);

  const MDX = page.body;
  
  return (
    <div className="p-4">
      <h1 className="font-bold">{page.title}</h1>
      <p className="text-sm text-gray-500">{page.description}</p>
      <div className="bg-gray-300 p-4">
        <MDX />
      </div>
    </div>
  );
}
