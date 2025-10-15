import { headers } from 'next/headers'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const headersList = await headers()
  const cookie = headersList.get('cookie')
  return Response.json({ cookie })
}