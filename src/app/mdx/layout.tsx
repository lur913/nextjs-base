export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <div className="text-blue-600 max-w-3xl mx-auto">{children}</div>
}