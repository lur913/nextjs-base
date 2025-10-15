export async function GET(request: Request) {
  const url = request.url
  return Response.json({ message: "Hello, World!", url })
}

export async function POST(request: Request) {
  const res = await request.json()
  return Response.json({ message: "POST request received", res })
}