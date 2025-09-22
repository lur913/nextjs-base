type Props = {
  params: Promise<{slug: string[]}>
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  return (
    <div>
      <h3>shop detail</h3>
      <div>slug: { slug.join('-') }</div>
    </div>
  )
}