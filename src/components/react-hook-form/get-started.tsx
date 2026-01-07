'use client';

import { Span } from "next/dist/trace";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// 输入类型
type Inputs = {
  example: string;
  exampleRequired: string;
};

// input 样式
const inputClass = "block border border-gray-50 py-2 px-4 rounded"



/**
 * 演示 https://react-hook-form.com/get-started
 * @returns React.ReactNode
 */
export function GetStarted() {
  return <ApplyValidation />;
}

// 4. Integrating an existing form 集成已经存在的 form


// 3. Apply validation 应用校验
interface IFormInput {
  firstName: string
  lastName: string
  age: number
}

function ApplyValidation() {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(`onSubmit: `, data);
  }

  // 测试 valid 选项 onChang
  const [preview, setPreview] = useState('')

  // required - 验证字段不能为空
  // pattern - 只验证正则表达式（空值会跳过）
  // min/max - 只验证数字范围（空值会跳过）
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input className={inputClass} {...register("firstName", { required: true, maxLength: 20, onChange: e => setPreview(e.target.value) })} />
      {errors.firstName && <p>firstName 不能为空</p>}
      <input className={inputClass} {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
      {errors.lastName && <p>lastName pattern: /^[A-Za-z]+$/i</p>}
      <input className={inputClass} type="number" {...register("age", { min: 18, max: 99 })} />
      {errors.age && <p>age min: 18, max: 99</p>}
      <input className={inputClass} type="submit" />
      <p>firstName 预览：{preview}</p>
    </form>
  )
}



enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string
  gender: GenderEnum
}

// 2. Register fields 注册字段
/**
 * 这个 register() 函数会返回以下及各个属性和方法
 * - name
 * - onBlur()
 * - onChange()
 * - ref
 * 感悟：
 * 这个快的知识感觉还是很简单
 */
function RegisterFields() {
  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(`onSubmit: `,data);
  // console.log(111, register("firstName"));
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label>First Name</label>
      <input className={inputClass} {...register("firstName")} />
      <label>Gender Selection</label>
      <select className={inputClass} {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input className={inputClass} type="submit" />
    </form>
  )
}

// 1. 先看 Quickstart 这部分
function QuickStart() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(`onSubmit: `,data);

  console.log(`watch: `, watch("example")); // 通过传递名称来监听输入值

  return (
    /* "handleSubmit" 会在调用 "onSubmit" 之前验证您的输入 */
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 通过调用 "register" 函数将您的输入注册到 hook 中 */}
      <input className={inputClass} defaultValue="test" {...register("example")} />

      {/* 包含必填或其他标准 HTML 验证规则 */}
      <input className={inputClass} {...register("exampleRequired", { required: true })} />
      {/* 当字段验证失败时将返回错误 */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input className={inputClass} type="submit" />
    </form>
  );
}
