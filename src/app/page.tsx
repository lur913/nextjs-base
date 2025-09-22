
export default async function Home() {
  // 等待5秒
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  return (
    <div>
      这是 home page
    </div>
  );
}
