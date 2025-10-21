import { type NextRequest } from "next/server";


const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }, 
  { id: 4, name: 'Alice' },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const idStr = searchParams.get('id')
  const id = idStr ? parseInt(idStr) : null
  if (id) {
    return Response.json(users)
  } else {
    return Response.json({message: '参数缺失！！！'}, {status: 400})
  }
}