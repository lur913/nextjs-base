import React, { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";

type FormValues = {
  title: string;
  needInvoice: boolean;
  invoiceTitle?: string;
  taxNo?: string;
};

export default function App() {
  const {
    register,
    control,
    handleSubmit,
    unregister,
  } = useForm<FormValues>({
    defaultValues: {
      needInvoice: false,
    },
  });

  // ✅ 只监听条件字段
  const needInvoice = useWatch({
    name: "needInvoice",
    control,
  });

  // ✅ 条件变化时处理副作用
  useEffect(() => {
    if (!needInvoice) {
      // 当不需要发票时，移除相关字段
      unregister(["invoiceTitle", "taxNo"]);
    }
  }, [needInvoice, unregister]);

  const onSubmit = (data: FormValues) => {
    console.log("提交数据：", data);
    // alert(JSON.stringify(data, null, 2));
  };

  // 渲染次数
  const count = useRef(0)
  count.current += 1

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">条件表单示例-{count.current}</h2>

      {/* 条件开关 */}
      <label className="flex items-center gap-3 p-4 mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
        <span className="text-gray-700 dark:text-gray-200 font-medium">公司名称</span>
        <input type="text" {...register("title")} className=" text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
      </label>
      <label className="flex items-center gap-3 p-4 mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
        <input type="checkbox" {...register("needInvoice")} className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
        <span className="text-gray-700 dark:text-gray-200 font-medium">是否需要发票</span>
      </label>

      {/* 条件字段 */}
      {needInvoice && (
        <div className="p-5 mb-4 ml-4 bg-blue-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-blue-500">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              发票抬头：
              <input
                {...register("invoiceTitle", {
                  required: "请输入发票抬头",
                })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                placeholder="请输入发票抬头"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              税号：
              <input
                {...register("taxNo", {
                  required: "请输入税号",
                })}
                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all"
                placeholder="请输入税号"
              />
            </label>
          </div>
        </div>
      )}

      <button type="submit" className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        提交
      </button>
    </form>
  );
}
