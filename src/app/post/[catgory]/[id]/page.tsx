type Props = {
  params: Promise<{catgory: string, id: string}>
}

export default async function Page({ params }: Props) {
  const { catgory, id } = await params
  return (
    <div>
      <h3>post detail</h3>
      <div>catgory: { catgory }</div>
      <div>id: { id }</div>
    </div>
  )
}