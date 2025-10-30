import Welcome, { metadata } from "@/content/welcome.mdx";

function CustomH1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-3xl font-bold text-green-700 underline">{children}</h1>;
}

const overrideComponents = {
  h1: CustomH1,
};

export default function Page() {
  console.log(1111, metadata);
  return (
    <div className="p-4">
      <div>这是个普通的文件路由页面，下面是导入的 mdx 内容</div>
      <div className="border rounded-2xl p-4">
        <Welcome components={overrideComponents}/>
      </div>
    </div>
  );
}
