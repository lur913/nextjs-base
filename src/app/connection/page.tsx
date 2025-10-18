import { connection, after } from "next/server";

/**
 * 使用场景：
 * - 没有使用场景的动态 api；
 * - 又需要保持动态渲染的的情况下；
 */

export default async function ConnectionPage() {
  await connection()
  const rand = Math.random();
  after(() => {
    console.log(`响应完成后执行，可用于日志记录和分析`)
  })
  return (
    <div>
      <h1>Connection</h1>
      <p>Random number: {rand}</p>
    </div>
  );
}