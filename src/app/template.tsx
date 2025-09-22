
export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="text-blue-600">这是根 template </div>
      {children}
    </div>
  );
}

