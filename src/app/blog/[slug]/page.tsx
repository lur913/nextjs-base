import { CustomMDX } from "@/components/mdx";
import { getBlogPosts, formatDate } from "@/utils/blog";

export async function generateStaticParams() {
  let posts = getBlogPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Blog(
  {params}:{
    params: Promise<{slug: string}>
  }
) {
  const { slug } = await params
  let post: any = getBlogPosts().find((post) => post.slug === slug)
  const baseUrl = 'http://localhost:3000'
  return (
    
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}