import { allPosts } from "content-collections";

export default function Posts() {
  return (
    <ul>
      {allPosts.map((post) => {
        console.log(1111, post._meta.path);
        return (
          <li key={post._meta.path}>
            <a href={`/blog/${post._meta.path}`}>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
