import { source } from "@/lib/source";


export default async function Page() {
  const pageTree  = source.pageTree
  console.log(`pageTree: `, pageTree);

  const page = source.getPage(['ui', 'ui-index'])
  console.log(`ui-index: `, page);
  if(!page) {
    return <div>not found</div>
  }
  const MDXContent = page.data.body

  /**
   * 参数
   * raw - 没有处理的 mdx
   * processed - 已经处理了的，没有 frontmatter 等内容了
   */
  const text = await page.data.getText('processed')
  console.log(`text: `, text);
  

  const pageList = source.getPages()
  console.log(`pageList: `, pageList);

  const params = source.generateParams()
  console.log(`params: `, params);

  const lang = source.getLanguages()
  console.log(`lang: `, lang);

  // 只能获取一个存在的文档，否则为 undefined
  const pageByHref = source.getPageByHref('/docs/ui/page-info')
  console.log(`pageByHref: `, pageByHref);

  return (
    <div>
      <h1>测试 source 的api</h1>
      <MDXContent/>
    </div>
  );
}