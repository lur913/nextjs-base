export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="bg-purple-400 p-4">
      {children}
    </section>
  );
}