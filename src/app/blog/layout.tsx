
type Props = {
  children: React.ReactNode
}

export default async function BlogLayout({ children, params }: Props) {
  const { slug } = await params
  return (
    <div>
      <div className="bg-green-600 text-white font-semibold">
        <p>这是 blog 布局</p>
      </div>
      {children}
    </div>
  )
}