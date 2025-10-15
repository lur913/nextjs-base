import type { NextRequest } from 'next/server'

// Route context helper
export async function GET(req: NextRequest, ctx: RouteContext<'/api/user/[id]'>) {
  const { id } = await ctx.params
  const url = req.url
  const searchParams = req.nextUrl.searchParams
  const name = searchParams.get('name') || 'Unknown'
  return Response.json({ id, name, url })
}