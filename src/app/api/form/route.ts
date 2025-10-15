export async function POST(request: Request) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  return Response.json({ message: "Form submitted successfully", data });
}