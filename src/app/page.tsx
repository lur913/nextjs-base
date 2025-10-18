import { draftMode } from "next/headers";
import Link from "next/link";

export default async function HomePage() {
  const { isEnabled } = await draftMode()

  /**
   * 我大概是明白了这个使用方法了
   * 根据是否是草稿模式，可以渲染不同的内容，
   * 比如：
   * mdx 文件有个 metadata 字段 draft 来控制是否是草稿
   * 根 isEnabled 来决定是否渲染草稿内容
   */
  return (
    <div>
      <h1>Home</h1>
      <Link href="/connection" className="text-blue-500 underline">Connection</Link>
      <div>{ isEnabled ? '草稿模式已开启' : '草稿模式已关闭' }</div>
    </div>
  );
}