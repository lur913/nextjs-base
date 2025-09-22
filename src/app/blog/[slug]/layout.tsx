type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export default async function BlogDetailLayout({ children, params}: Props) {
  const { slug } = await params;
  return (
    <div>
      <h1 className="bg-pink-600">详情布局，slug - {slug}</h1>
      {children}
    </div>
  );
}