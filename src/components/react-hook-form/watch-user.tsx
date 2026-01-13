import React from "react";
import { useForm, useWatch, Control } from "react-hook-form";

// 定义表单字段类型
interface FormValues {
  user: {
    name: string;
    age: number;
  };
  userId: string;
}

// 子组件：默认监听行为（会监听子字段变化）
function WatchUser({ control }: { control: Control<FormValues> }) {
  const user = useWatch({
    control,
    name: "user",
    defaultValue: { name: "", age: 0 },
  });

  console.log("WatchUser 渲染");

  return (
    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">默认监听 user（包含子字段）</h3>
      <p className="text-blue-800 dark:text-blue-200"><span className="font-medium">Name:</span> {user.name}</p>
      <p className="text-blue-800 dark:text-blue-200"><span className="font-medium">Age:</span> {user.age}</p>
    </div>
  );
}

// 子组件：使用 exact: true（只监听整个 user 对象本身）
function WatchUserExact({ control }: { control: Control<FormValues> }) {
  const user = useWatch({
    control,
    name: "user",
    defaultValue: { name: "", age: 0 },
    exact: true,
  });

  console.log("WatchUserExact 渲染");

  return (
    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
      <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">使用 exact: true，只监听 user 对象本身</h3>
      <p className="text-green-800 dark:text-green-200"><span className="font-medium">Name:</span> {user.name}</p>
      <p className="text-green-800 dark:text-green-200"><span className="font-medium">Age:</span> {user.age}</p>
    </div>
  );
}

// 父组件表单
export default function App() {
  const { register, control, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      user: { name: "", age: 0 },
      userId: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("提交表单数据:", data);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">useWatch exact 示例</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User Name:</label>
          <input {...register("user.name")} placeholder="name" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User Age:</label>
          <input
            type="number"
            {...register("user.age", { valueAsNumber: true })}
            placeholder="age"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">User ID:</label>
          <input {...register("userId")} placeholder="userId" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white" />
        </div>

        <button type="submit" className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          提交
        </button>

        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        {/* 默认监听，包含子字段变化 */}
        <WatchUser control={control} />

        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        {/* 使用 exact: true，只监听对象本身 */}
        <WatchUserExact control={control} />

        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        <button
          type="button"
          onClick={() =>
            setValue("user", { name: "Tom", age: 20 })
          }
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          更新整个 user 对象
        </button>
      </form>
    </div>
  );
}
