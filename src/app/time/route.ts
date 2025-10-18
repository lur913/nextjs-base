export const dynamic = 'force-static'

/**
 * 在 nextjs 15 中 get 处理器默认是动态渲染的
 * @param request 
 * @returns 
 */

export async function GET(request: Request) {
  const time = new Date().toLocaleString()
  return Response.json({ time })
}