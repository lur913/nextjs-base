"use client";

import useSWR from "swr";

class ApiError extends Error {
  constructor(message: string, public status?: number, public info?: any) {
    super(message);
    this.name = "ApiError";
  }
}

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    // if (!res.ok) {
    //   // 抛出包含错误信息的对象，会被 useSWR 的 error 捕获
    //   const errorData = await res.json().catch(() => ({}));
    //   throw new Error(errorData.message || '请求失败');
    // }
    if (!res.ok) {
      const error = new ApiError("An error occurred while fetching the data.");
      // 将额外的信息附加到错误对象上。
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    return res.json();
  });

type User = {
  id: number;
  name: string;
};

export default function ClientSwrPage() {
  const { data, error, isLoading } = useSWR<User[], ApiError>(
    "/api/data?id=1",
    fetcher,
    {
      errorRetryCount: 2
    }
  );

  if (isLoading) return <div>SWR Loading...</div>;
  if (error)
    return (
      <div>
        <p>Error: {error.message}</p>
        <p>Status: {error.status}</p>
        <pre>{JSON.stringify(error.info, null, 2)}</pre>
      </div>
    );
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1>client swr</h1>
      <ul className="p-4 rounded bg-stone-900 mt-4">
        {data?.map((user) => (
          <li
            key={user.id}
            className="border border-dashed border-stone-700 rounded my-4 p-2"
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
