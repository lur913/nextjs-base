"use client";

import { useForm, useController, SubmitHandler } from "react-hook-form";

// 输入类型
type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  subscribe: boolean;
  gender: "male" | "female" | "other";
  bio: string;
};

// input 样式
const inputClass = "block border border-gray-300 py-2 px-4 rounded w-full";
const labelClass = "block font-medium mb-1";
const errorClass = "text-red-500 text-sm mt-1";
const wrapperClass = "mb-4";

/**
 * useController 完整示例
 * 演示 https://react-hook-form.com/usecontroller
 *
 * useController 适用于：
 * 1. 需要完全控制输入组件的渲染
 * 2. 使用自定义 UI 组件库（如 Material-UI, Ant Design 等）
 * 3. 需要精细控制输入的行为和样式
 * 4. 不受控组件（Uncontrolled Components）无法满足需求时
 */
export function UseControllerDemo() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 18,
      subscribe: false,
      gender: "male",
      bio: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("表单提交数据：", data);
    alert("表单提交成功！请查看控制台");
  };

  // 实时监听表单值变化
  const formValues = watch();
  console.log("当前表单值：", formValues);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">useController 完整示例</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* 示例 1: 基础文本输入 */}
        <div className={wrapperClass}>
          <label className={labelClass}>名字</label>
          <InputField
            name="firstName"
            control={control}
            rules={{ required: "名字不能为空" }}
            placeholder="请输入名字"
          />
          {errors.firstName && (
            <p className={errorClass}>{errors.firstName.message}</p>
          )}
        </div>

        {/* 示例 2: 带模式验证的输入 */}
        <div className={wrapperClass}>
          <label className={labelClass}>姓氏</label>
          <InputField
            name="lastName"
            control={control}
            rules={{
              required: "姓氏不能为空",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "姓氏只能包含字母",
              },
            }}
            placeholder="请输入姓氏"
          />
          {errors.lastName && (
            <p className={errorClass}>{errors.lastName.message}</p>
          )}
        </div>

        {/* 示例 3: 邮箱输入带复杂验证 */}
        <div className={wrapperClass}>
          <label className={labelClass}>邮箱</label>
          <InputField
            name="email"
            control={control}
            rules={{
              required: "邮箱不能为空",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "邮箱格式不正确",
              },
            }}
            placeholder="example@email.com"
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        {/* 示例 4: 数字输入 */}
        <div className={wrapperClass}>
          <label className={labelClass}>年龄</label>
          <NumberInputField
            name="age"
            control={control}
            rules={{
              required: "年龄不能为空",
              min: { value: 18, message: "年龄必须大于 18 岁" },
              max: { value: 100, message: "年龄必须小于 100 岁" },
            }}
          />
          {errors.age && <p className={errorClass}>{errors.age.message}</p>}
        </div>

        {/* 示例 5: 复选框 */}
        <div className={wrapperClass}>
          <CheckboxField
            name="subscribe"
            control={control}
            label="订阅我们的新闻通讯"
          />
        </div>

        {/* 示例 6: 单选按钮组 */}
        <div className={wrapperClass}>
          <label className={labelClass}>性别</label>
          <RadioGroupField
            name="gender"
            control={control}
            options={[
              { value: "male", label: "男" },
              { value: "female", label: "女" },
              { value: "other", label: "其他" },
            ]}
          />
        </div>

        {/* 示例 7: 文本域 */}
        <div className={wrapperClass}>
          <label className={labelClass}>个人简介</label>
          <TextareaField
            name="bio"
            control={control}
            rules={{
              minLength: {
                value: 10,
                message: "个人简介至少 10 个字符",
              },
              maxLength: {
                value: 200,
                message: "个人简介最多 200 个字符",
              },
            }}
            placeholder="请介绍一下自己..."
            rows={4}
          />
          {errors.bio && <p className={errorClass}>{errors.bio.message}</p>}
        </div>

        {/* 提交按钮 */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
          >
            提交
          </button>
          <button
            type="button"
            onClick={() => {
              // 重置表单需要在 useForm 中声明 reset 方法
              console.log("重置表单");
            }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded"
          >
            重置
          </button>
        </div>
      </form>

      {/* 实时显示表单值 */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-bold mb-2">当前表单值（实时）</h2>
        <pre className="text-sm overflow-x-auto">
          {JSON.stringify(formValues, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// ========== 自定义输入组件 ==========

/**
 * 自定义文本输入组件
 * 使用 useController hook 连接到 react-hook-form
 */
interface InputFieldProps {
  name: keyof FormInputs;
  control: any;
  rules?: any;
  placeholder?: string;
  type?: string;
}

function InputField({ name, control, rules, placeholder, type = "text" }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
      placeholder={placeholder}
      className={`${inputClass} ${invalid ? "border-red-500" : "border-gray-300"}`}
    />
  );
}

/**
 * 自定义数字输入组件
 */
interface NumberInputFieldProps {
  name: keyof FormInputs;
  control: any;
  rules?: any;
}

function NumberInputField({ name, control, rules }: NumberInputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      onBlur={onBlur}
      ref={ref}
      className={`${inputClass} ${invalid ? "border-red-500" : "border-gray-300"}`}
    />
  );
}

/**
 * 自定义复选框组件
 */
interface CheckboxFieldProps {
  name: keyof FormInputs;
  control: any;
  label: string;
}

function CheckboxField({ name, control, label }: CheckboxFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    name,
    control,
  });

  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
        ref={ref}
        className="w-4 h-4"
      />
      <span>{label}</span>
    </label>
  );
}

/**
 * 自定义单选按钮组组件
 */
interface RadioGroupFieldProps {
  name: keyof FormInputs;
  control: any;
  options: { value: string; label: string }[];
}

function RadioGroupField({ name, control, options }: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({
    name,
    control,
  });

  return (
    <div className="flex gap-4">
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-2">
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            ref={ref}
            className="w-4 h-4"
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}

/**
 * 自定义文本域组件
 */
interface TextareaFieldProps {
  name: keyof FormInputs;
  control: any;
  rules?: any;
  placeholder?: string;
  rows?: number;
}

function TextareaField({
  name,
  control,
  rules,
  placeholder,
  rows = 3,
}: TextareaFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <textarea
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      ref={ref}
      placeholder={placeholder}
      rows={rows}
      className={`${inputClass} ${invalid ? "border-red-500" : "border-gray-300"}`}
    />
  );
}

/**
 * useController vs Controller 的区别：
 *
 * useController:
 * - 是一个 Hook，只能在函数组件内部使用
 * - 返回 field 和 fieldState 对象
 * - 更灵活，可以完全自定义组件渲染
 * - 适合创建可复用的自定义输入组件
 *
 * Controller:
 * - 是一个组件，通过 render prop 模式使用
 * - 通过 render 函数的参数提供 field 和 fieldState
 * - 适合在 JSX 中直接使用，无需创建单独组件
 * - 更简洁，适合一次性使用的场景
 *
 * 使用建议：
 * - 如果要创建可复用的输入组件 → 使用 useController
 * - 如果只是临时需要控制一个组件 → 使用 Controller
 */
