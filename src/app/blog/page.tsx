
import { docs } from 'fumadocs-mdx:collections/server';

export default function Page() {
  console.log(111, docs);
  return (
    <div>
      <h1>Blog page</h1>
    </div>
  );
}