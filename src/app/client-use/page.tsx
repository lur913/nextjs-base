import List from "@/components/list";
import { Suspense } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

async function getUsers() {
  const data =await fetch("https://jsonplaceholder.typicode.com/users");
  const response: User[] = await data.json();
  return response;
}

export default function ClientUsePage() {
  const data = getUsers();
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1>Client Use</h1>
      <Suspense fallback={<div>加载中...</div>}>
        <List list={data} />
      </Suspense>
    </div>
  );
}
