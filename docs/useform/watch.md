# watch

订阅输入变化

## 概述

此方法将监视指定的输入并返回它们的值。它对于渲染输入值和根据条件决定渲染内容非常有用。

## 重载

此函数主要服务于**两个目的**:

1. 返回并保持与字段值的同步
   - `watch(name: string, defaultValue?): unknown`
   - `watch(names: string[], defaultValue?): {[key:string]: unknown}`
   - `watch(): {[key:string]: unknown}`

2. 通过给定的回调函数开始订阅(可以通过调用 `unsubscribe` 函数停止)
   - `watch(callback: (data, { name, type }) => void, defaultValues?): { unsubscribe: () => void }`

以下是这四种重载的详细说明。

---

## 1-a. 监视单个字段 `watch(name: string, defaultValue?: unknown): unknown`

在渲染外部监视和订阅单个字段。

### 参数

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `name` | `string` | 字段名称 |
| `defaultValue` | `unknown` | *可选*。字段的默认值 |

### 返回值

返回单个字段的值。

```javascript
const name = watch("name")
```

---

## 1-b. 监视多个字段 `watch(names: string[], defaultValue?: {[key:string]: unknown}): unknown[]`

在渲染外部监视和订阅一组字段。

### 参数

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `names` | `string[]` | 字段名称数组 |
| `defaultValue` | `{[key:string]: unknown}` | *可选*。字段的默认值 |

### 返回值

返回字段值数组。

```javascript
const [name, name1] = watch(["name", "name1"])
```

---

## 1-c. 监视整个表单 `watch(): {[key:string]: unknown}`

监视和订阅整个表单的更新/变化,基于 onChange 并在 useForm 处重新渲染。

### 参数

无

### 返回值

返回整个表单的值。

```javascript
const formValues = watch()
```

---

## 2. 使用回调函数开始监视 `watch(callback: (data, { name, type }) => void, defaultValues?: {[key:string]: unknown}): { unsubscribe: () => void }`

订阅字段的更新/变化而不触发重新渲染。

### 参数

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `callback` | `(data, { name, type }) => void` | 订阅所有字段变化的回调函数 |
| `defaultValues` | `{[key:string]: unknown}` | *可选*。整个表单的默认值 |

### 返回值

返回包含 `unsubscribe` 函数的对象。

```javascript
useEffect(() => {
  const { unsubscribe } = watch((value) => {
    console.log(value)
  })
  return () => unsubscribe()
}, [watch])
```

---

## 规则

- 当未定义 `defaultValue` 时,`watch` 的首次渲染将返回 `undefined`,因为它是在 `register` 之前调用的。**建议**在 `useForm` 中提供 `defaultValues` 以避免此行为,但您也可以将内联的 `defaultValue` 作为第二个参数设置。
- 当同时提供 `defaultValue` 和 `defaultValues` 时,将返回 `defaultValue`。
- 此 API 将在应用程序或表单的根级别触发重新渲染,如果遇到性能问题,建议使用回调函数或 `useWatch` API。
- `watch` 的结果针对渲染阶段进行了优化,而不是 `useEffect` 的依赖项,要检测值更新,您可能希望使用外部自定义 hook 进行值比较。

---

## 示例

### 在表单中监视

#### TypeScript

```tsx
import { useForm } from "react-hook-form"

interface IFormInputs {
  name: string
  showAge: boolean
  age: number
}

function App() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>()

  const watchShowAge = watch("showAge", false) // 您可以提供默认值作为第二个参数
  const watchAllFields = watch() // 当不传递任何参数时,您正在监视所有内容
  const watchFields = watch(["showAge", "age"]) // 您也可以通过名称定位特定字段

  // watch 的回调版本。完成后取消订阅是您的责任。
  React.useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = (data: IFormInputs) => console.log(data)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true, maxLength: 50 })} />
        <input type="checkbox" {...register("showAge")} />
        {/* 根据选择显示年龄输入框 */}
        {watchShowAge && (
          <input type="number" {...register("age", { min: 50 })} />
        )}
        <input type="submit" />
      </form>
    </>
  )
}
```

#### JavaScript

```jsx
import { useForm } from "react-hook-form"

function App() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const watchShowAge = watch("showAge", false) // 您可以提供默认值作为第二个参数
  const watchAllFields = watch() // 当不传递任何参数时,您正在监视所有内容
  const watchFields = watch(["showAge", "number"]) // 您也可以通过名称定位特定字段

  // watch 的回调版本。完成后取消订阅是您的责任。
  React.useEffect(() => {
    const subscription = watch((value, { name, type }) =>
      console.log(value, name, type)
    )
    return () => subscription.unsubscribe()
  }, [watch])

  const onSubmit = (data) => console.log(data)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="checkbox" {...register("showAge")} />
        {/* 根据选择显示年龄输入框 */}
        {watchShowAge && (
          <input type="number" {...register("age", { min: 50 })} />
        )}
        <input type="submit" />
      </form>
    </>
  )
}
```

### 在字段数组中监视

#### TypeScript

```tsx
import * as React from "react"
import { useForm, useFieldArray } from "react-hook-form"

type FormValues = {
  test: {
    firstName: string
    lastName: string
  }[]
}

function App() {
  const { register, control, handleSubmit, watch } = useForm<FormValues>()
  const { fields, remove, append } = useFieldArray({
    name: "test",
    control,
  })

  const onSubmit = (data: FormValues) => console.log(data)

  console.log(watch("test"))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <input
              defaultValue={field.firstName}
              {...register(`test.${index}.firstName`)}
            />
            <input
              defaultValue={field.lastName}
              {...register(`test.${index}.lastName`)}
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        )
      })}
      <button
        type="button"
        onClick={() =>
          append({
            firstName: "bill" + renderCount,
            lastName: "luo" + renderCount,
          })
        }
      >
        Append
      </button>
    </form>
  )
}
```

#### JavaScript

```jsx
import * as React from "react"
import { useForm, useFieldArray } from "react-hook-form"

function App() {
  const { register, control, handleSubmit, watch } = useForm()
  const { fields, remove, append } = useFieldArray({
    name: "test",
    control,
  })

  const onSubmit = (data) => console.log(data)

  console.log(watch("test"))

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <input
              defaultValue={field.firstName}
              {...register(`test.${index}.firstName`)}
            />
            <input
              defaultValue={field.lastName}
              {...register(`test.${index}.lastName`)}
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        )
      })}
      <button
        type="button"
        onClick={() =>
          append({
            firstName: "bill" + renderCount,
            lastName: "luo" + renderCount,
          })
        }
      >
        Append
      </button>
    </form>
  )
}
```

---

## 视频

<!-- 视频内容将在实际页面中显示 -->

---

## 感谢您的支持

如果您发现 React Hook Form 在您的项目中很有用,请考虑在 GitHub 上 star 并支持我们。

[在 GitHub 上给我们 Star](https://github.com/react-hook-form/react-hook-form)
