import { cookies } from "next/headers";


export async function GET(request: Request) {
  const cookieStore = await cookies()
  // const token = cookieStore.set('token', '123456')
  const token = cookieStore.get('token')
  const all = cookieStore.getAll()
  return Response.json({ token: token?.value, all })
}