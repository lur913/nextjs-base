import Welcome from "@/content/welcome.mdx";

export default function Page() {
  return (
    <div className="p-4">
      <div>
        这是个普通的文件路由页面，下面是导入的 mdx 内容
      </div>
      <div className="border rounded-2xl p-4">
        <Welcome />
      </div>
    </div>
  );
}
