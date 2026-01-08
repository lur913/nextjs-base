"use client";

import { Span } from "next/dist/trace";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ValueDemo from "./value-demo";

// 输入类型
type Inputs = {
  example: string;
  exampleRequired: string;
};

// input 样式
const inputClass = "block border border-gray-50 py-2 px-4 rounded";

/**
 * 演示 https://react-hook-form.com/get-started
 * @returns React.ReactNode
 */
export function GetStarted() {
  return <ValidRequired />;
}

// 5. 测试校验选项 - validate
type VProp = {
  email: string | undefined;
  password: string;
  confirmPassword: string;
  age: number;
  birthDate: Date;
  code: string;
};
function Validate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VProp>();
  const onSubmit: SubmitHandler<VProp> = (data) => {
    console.log(`onSubmit: `, data);
  };

  const [show, setShow] = useState(true);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {show && (
        <input
          {...register("email", {
            required: "email 不能为空",
            // disabled: true,
            shouldUnregister: true,
            // validate: (value) => value.includes("@") || "请输入有效的邮箱地址",
          })}
          className={inputClass}
        />
        // {errors.email && <p>{errors.email.message || "默认校验提示"}</p>}
      )}

      <input
        {...register("age", {
          required: "age 不能为空",
          valueAsNumber: true,
        })}
        className={inputClass}
      />
      {errors.age && <p>{errors.age.message || "默认校验提示"}</p>}

      <input
        {...register("code", {
          required: "code 不能为空",
          setValueAs: (val) => {
            return val.toUpperCase().length;
          },
        })}
        className={inputClass}
      />
      {errors.code && <p>{errors.code.message || "默认校验提示"}</p>}

      <input
        type="date"
        {...register("birthDate", {
          required: "birthDate 不能为空",
          valueAsDate: true,
        })}
        className={inputClass}
      />
      {errors.birthDate && <p>{errors.birthDate.message || "默认校验提示"}</p>}

      <input
        {...register("password", {
          validate: {
            hasUpperCase: (value) => /[A-Z]/.test(value) || "需包含大写字母",
            hasLowerCase: (value) => /[a-z]/.test(value) || "需包含小写字母",
            hasNumber: (value) => /\d/.test(value) || "需包含数字",
            minLength: (value) => value.length >= 8 || "至少8个字符",
          },
          deps: "confirmPassword",
        })}
        className={inputClass}
      />
      {errors.password && <p>{errors.password.message || "默认校验提示"}</p>}

      <input
        {...register("confirmPassword", {
          validate: (value, formValues) => {
            console.log(1111, formValues); // 确实可以方位 form 表单的所有值
            return value === formValues.password || "两次密码不一致";
          },
        })}
        className={inputClass}
      />
      {errors.confirmPassword && (
        <p>{errors.confirmPassword.message || "默认校验提示"}</p>
      )}

      <input type="submit" className={inputClass} />
      <button
        type="button"
        className={inputClass}
        onClick={() => setShow(!show)}
      >
        {show ? "隐藏可选字段" : "显示可选字段"}
      </button>
    </form>
  );
}

// 4. 测试校验的选项 - required：
type RProp = {
  name: string;
  address: string;
  tel: number;
};
function ValidRequired() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RProp>();

  const onSubmit: SubmitHandler<RProp> = (data) => {
    console.log(`onSubmit: `, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("name", {
          required: { value: true, message: "name 不能为空!!" },
        })}
        className={inputClass}
      />
      <input
        {...register("tel", {
          required: true,
          onChange: (e) => {
            const rawValue = e.target.value.replace(/\D/g, "");
            const formatted = rawValue.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
            setValue("tel", formatted);
          },
          // pattern: {
          //   value: /^1[3-9]\d{9}$/,
          //   message: "手机号格式不正确",
          // },
        })}
        className={inputClass}
      />
      {errors.tel && <p>{errors.tel.message}</p>}
      <input
        {...register("address", {
          minLength: {
            value: 4,
            message: "至少4个字符",
          },
          maxLength: {
            value: 8,
            message: "最多8个字符",
          },
        })}
        className={inputClass}
      />
      {errors.address && (
        <p>{errors.address.message || "默认 required 提示"}</p>
      )}
      <input type="submit" className={inputClass} />
      {errors.name && <p>{errors.name.message || "默认 required 提示"}</p>}
    </form>
  );
}

// 3. Apply validation 应用校验
interface IFormInput {
  firstName: string;
  lastName: string;
  age: number;
}

function ApplyValidation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(`onSubmit: `, data);
  };

  // 测试 valid 选项 onChang
  const [preview, setPreview] = useState("");

  // required - 验证字段不能为空
  // pattern - 只验证正则表达式（空值会跳过）
  // min/max - 只验证数字范围（空值会跳过）

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        className={inputClass}
        {...register("firstName", {
          required: true,
          maxLength: 20,
          onChange: (e) => setPreview(e.target.value),
        })}
      />
      {errors.firstName && <p>firstName 不能为空</p>}
      <input
        className={inputClass}
        {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
      />
      {errors.lastName && <p>lastName pattern: /^[A-Za-z]+$/i</p>}
      <input
        className={inputClass}
        type="number"
        {...register("age", { min: 18, max: 99 })}
      />
      {errors.age && <p>age min: 18, max: 99</p>}
      <input className={inputClass} type="submit" />
      <p>firstName 预览：{preview}</p>
    </form>
  );
}

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string;
  gender: GenderEnum;
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
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    console.log(`onSubmit: `, data);
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
  );
}

// 1. 先看 Quickstart 这部分
function QuickStart() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log(`onSubmit: `, data);

  console.log(`watch: `, watch("example")); // 通过传递名称来监听输入值

  return (
    /* "handleSubmit" 会在调用 "onSubmit" 之前验证您的输入 */
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* 通过调用 "register" 函数将您的输入注册到 hook 中 */}
      <input
        className={inputClass}
        defaultValue="test"
        {...register("example")}
      />

      {/* 包含必填或其他标准 HTML 验证规则 */}
      <input
        className={inputClass}
        {...register("exampleRequired", { required: true })}
      />
      {/* 当字段验证失败时将返回错误 */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input className={inputClass} type="submit" />
    </form>
  );
}
