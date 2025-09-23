export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <section className="bg-rose-400 p-4">
      {children}
    </section>
  );
}