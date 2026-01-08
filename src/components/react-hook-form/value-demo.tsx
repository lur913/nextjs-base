"use client";

import { useForm } from "react-hook-form";

type Inputs = {
  email1: string;
  email: string;
  status: string;
};

const inputClass = "block w-full border border-gray-300 p-2 rounded mt-1";

export default function ValueDemo() {
  const { register, watch } = useForm<Inputs>();

  const watchedValues = watch();

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">register value 选项演示</h1>

      <div className="bg-yellow-50 text-black p-3 rounded text-sm">
        <pre>{JSON.stringify(watchedValues, null, 2)}</pre>
      </div>

      <form className="space-y-4">
        {/* 场景 1：直接设置固定值 */}
        <div>
          <label className="block font-medium">1. value: "固定值"</label>
          <input
            {...register("email1", { value: "user@example.com" })}
            className={inputClass}
            placeholder="邮箱"
          />
          <p className="text-xs text-gray-500 mt-1">
            初始值固定为 "user@example.com"
          </p>
        </div>

        {/* 场景 2：根据条件动态设置值 */}
        <div>
          <label className="block font-medium">2. value: 动态表达式</label>
          <input
            {...register("status", {
              value: "active",
            })}
            className={inputClass}
          />
          <p className="text-xs text-gray-500 mt-1">
            直接通过 value 选项设置初始值
          </p>
        </div>

        {/* 场景 3：结合其他验证选项 */}
        <div>
          <label className="block font-medium">3. value + 验证规则</label>
          <input
            {...register("email", {
              value: "default@company.com",
              required: "邮箱不能为空",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "邮箱格式不正确",
              },
            })}
            className={inputClass}
          />
        </div>
      </form>
    </div>
  );
}
