import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { getMDXComponents } from "@/mdx-components";
import { ThemeToggle } from '@/components/theme-toggle';


export default function Page() {

  const page = source.getPage(['test'])
  if(!page) notFound();
  const MDX = page.data.body
  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1>docs page</h1>
      <div>
        <ThemeToggle/>
      </div>
      <pre>{JSON.stringify(source, null, 2)}</pre>
      <MDX components={getMDXComponents()}/>
    </div>

  );
}