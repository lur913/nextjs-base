"use client";

import { Span } from "next/dist/trace";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, useController, UseControllerProps } from "react-hook-form";
import ValueDemo from "./value-demo";
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BasicConditionalForm } from "./conditional-form";

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
  return <BasicConditionalForm />;
}

// 10. 使用 schema 校验
const formSchema = z.object({
  name: z.string().min(1, "name 不能为空"),
  age: z.number().min(1, 'age 不能为空')
})

type FormSchema = z.infer<typeof formSchema>

function WithSchemaValid() {
  const {register, handleSubmit, formState: { errors }} = useForm<FormSchema>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = (data: FormSchema) => {
    console.log(`onSubmit: `, data);
  }
  console.log(111, errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("name")}  className={inputClass}/>
      <p>{errors.name?.message}</p>

      <input {...register("age", {valueAsNumber: true})}  className={inputClass}/>
      <p>{errors.age?.message}</p>

      <input type="submit" className={inputClass}/>
    </form>
  )
}

// 9. 错误处理
type HProp = {
  firstName: string 
  mail: string
}
function HandleError() {
  
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<HProp>()
  const onSubmit: SubmitHandler<HProp> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        className={inputClass}
        {...register("firstName", { required: true })}
        aria-invalid={errors.firstName ? "true" : "false"}
      />
      {errors.firstName?.type === "required" && (
        <p role="alert">First name is required</p>
      )}

      <input
        className={inputClass}
        {...register("mail", { required: "Email Address is required" })}
        aria-invalid={errors.mail ? "true" : "false"}
      />
      {errors.mail && <p role="alert">{errors.mail.message}</p>}

      <input type="submit" className={inputClass}/>
    </form>
  )
}

// 8. 测试受控 input 的 hooks api
type FormValues = {
  FirstName: string
}

function Input(props: UseControllerProps<FormValues>) {
  const { field, fieldState } = useController(props)
  console.log(123, props);
  return (
    <div className="space-y-3">
      <input {...field} placeholder={props.name} className={inputClass}/>
      <p>{fieldState.isTouched && "Touched"}</p>
      <p>{fieldState.isDirty && "Dirty"}</p>
      <p>{fieldState.invalid ? "invalid" : "valid"}</p>
    </div>
  )
}

function ControlledHookAPI() {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      FirstName: "",
    },
    mode: "onChange",
  })
  const onSubmit = (data: FormValues) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input control={control} name="FirstName" rules={{ required: true }} />
      <input type="submit"  className={inputClass}/>
    </form>
  )
}


// 7. 测试多种类型的表单 - 包含输入框，选择框，多选，单选
function MutipForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      category: "",
      checkbox: [],
      radio: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(console.log)} className="space-y-4">
      <input
        className={inputClass}
        {...register("firstName", { required: true })}
        placeholder="First name"
      />

      <input
        className={inputClass}
        {...register("lastName", { minLength: 2 })}
        placeholder="Last name"
      />

      <select {...register("category")} className={inputClass}>
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>

      <label className="flex gap-2">
        <input
          className={inputClass}
          {...register("checkbox")}
          type="checkbox"
          value="B"
        />
        <span>A</span>
      </label>
      <input
        className={inputClass}
        {...register("checkbox")}
        type="checkbox"
        value="C"
      />

      <input
        className={inputClass}
        {...register("radio")}
        type="radio"
        value="A"
      />
      <input
        className={inputClass}
        {...register("radio")}
        type="radio"
        value="B"
      />
      <input
        className={inputClass}
        {...register("radio")}
        type="radio"
        value="C"
      />

      <input className={inputClass} type="submit" />
    </form>
  );
}

// 6. 测试一下嵌套值的情况
type IProps = {
  name: {
    firstName: string;
    lastName: string[];
  };
};
/**
 * 确实可以这样嵌套绑定
 */
function NestedValue() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProps>();
  const onSubmit: SubmitHandler<IProps> = (data) => {
    console.log(`onSubmit: `, data);
  };

  console.log(111, errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name.firstName", { required: "firstName 不能为空" })}
          className={inputClass}
        />
        {errors.name?.firstName && <p>{errors.name.firstName.message}</p>}
        <input
          {...register("name.lastName.0", { required: "lastName 不能为空" })}
          className={inputClass}
        />
        {errors.name?.lastName?.[0] && <p>{errors.name.lastName[0].message}</p>}
        <input type="submit" className={inputClass} />
      </form>
    </>
  );
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
            const formatted = rawValue.replace(
              /(\d{3})(\d{4})(\d{4})/,
              "$1-$2-$3"
            );
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
