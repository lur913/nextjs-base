import Link from 'next/link'
import Image, { ImageProps } from 'next/image'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

interface TableData {
  headers: string[];
  rows: string[][];
}

function Table({ data }: { data: TableData }) {
  let headers = data.headers.map((header: string, index: number) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row: string[], index: number) => (
    <tr key={index}>
      {row.map((cell: string, cellIndex: number) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

function CustomLink(props: CustomLinkProps){
  let href = props.href!

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: ImageProps) {
  return <Image className="rounded-lg" {...props} />
}

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children: string;
}

function Code({ children, ...props }: CodeProps) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

interface HeadingProps {
  children: React.ReactNode;
}

function createHeading(level: number) {
  const Heading = ({ children }: HeadingProps) => {
    let slug = slugify(children as string)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
}

interface CustomMDXProps {
  source: any;
  options?: any;
  components?: {
    [key: string]: React.ComponentType<any>;
  };
  onError?: React.ComponentType<any>;
  [key: string]: any;
}

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
