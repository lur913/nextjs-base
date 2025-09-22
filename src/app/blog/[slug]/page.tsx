

async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return ( 
    <div>
      <div>博客详情 - {slug}</div>
    </div>
  );
}

export default Page;