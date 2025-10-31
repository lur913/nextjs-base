export default async function Blog(
  {params}:{
    params: Promise<{slug: string}>
  }
) {
  const { slug } = await params
  return (
    <div>This is blog page - { slug }</div>
  );
}