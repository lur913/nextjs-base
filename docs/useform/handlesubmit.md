# handleSubmit

准备发送到服务器

## 函数签名

```typescript
handleSubmit: ((data: Object, e?: Event) => Promise<void>, (errors: Object, e?: Event) => Promise<void>) => Promise<void>
```

这个函数将在表单验证成功后接收表单数据。

## 参数

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| SubmitHandler | `(data: Object, e?: Event) => Promise<void>` | 成功时的回调函数 |
| SubmitErrorHandler | `(errors: Object, e?: Event) => Promise<void>` | 错误时的回调函数 |

## 规则

### 1. 异步表单提交

你可以使用 `handleSubmit` 轻松地异步提交表单。

```javascript
handleSubmit(onSubmit)()

// 你可以传递一个异步函数来进行异步验证。
handleSubmit(async (data) => await fetchAPI(data))
```

### 2. disabled 输入框的处理

`disabled` 输入框在表单值中将显示为 `undefined` 值。如果你想阻止用户更新输入框但希望保留表单值，可以使用 `readOnly` 或禁用整个 `<fieldset />`。

**示例：**

```typescript
// ❌ 使用 disabled - 值不会包含在提交的数据中
<input {...register("firstName")} defaultValue="John" disabled />
// 提交时 firstName 会是 undefined

// ✅ 使用 readOnly - 值会正常包含在提交的数据中
<input {...register("firstName")} defaultValue="John" readOnly />
// 提交时 firstName 会是 "John"
```

### 3. 错误处理

`handleSubmit` 函数不会吞掉你的 `onSubmit` 回调中发生的错误，所以我们建议你在异步请求中使用 try/catch 并为你的用户优雅地处理这些错误。

```typescript
const onSubmit = async () => {
  // 可能会导致错误的异步请求
  try {
    // await fetch()
  } catch (e) {
    // 处理你的错误
  }
}

return <form onSubmit={handleSubmit(onSubmit)} />
```

## 示例

### 同步提交

#### TypeScript

```typescript
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form"

type FormValues = {
  firstName: string
  lastName: string
  email: string
}

export default function App() {
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)
  const onError: SubmitErrorHandler<FormValues> = (errors) => console.log(errors)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input type="email" {...register("email")} />
      <input type="submit" />
    </form>
  )
}
```

#### JavaScript

```javascript
import { useForm } from "react-hook-form"

export default function App() {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data, e) => console.log(data, e)
  const onError = (errors, e) => console.log(errors, e)

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### 异步提交

```javascript
import { useForm } from "react-hook-form";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    await sleep(2000);
    if (data.username === "bill") {
      alert(JSON.stringify(data));
    } else {
      alert("There is an error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="username">User Name</label>
      <input placeholder="Bill" {...register("username")} />
      <input type="submit" />
    </form>
  );
}
```

## 实用技巧

### 使用 Fieldset 禁用多个输入框

```typescript
import { useForm } from "react-hook-form"
import { useState } from "react"

function App() {
  const { register, handleSubmit } = useForm()
  const [isDisabled, setIsDisabled] = useState(true)

  const onSubmit = (data) => {
    console.log(data)
    // 当 fieldset 被禁用时，里面的输入框会显示为 undefined
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset disabled={isDisabled}>
        <input {...register("firstName")} defaultValue="John" />
        <input {...register("lastName")} defaultValue="Doe" />
      </fieldset>
      <input {...register("email")} />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setIsDisabled(!isDisabled)}>
        Toggle Fieldset
      </button>
    </form>
  )
}
```

### 带加载状态的异步提交

```typescript
import { useForm } from "react-hook-form"
import { useState } from "react"

function App() {
  const { register, handleSubmit } = useForm()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('提交失败')
      }

      const result = await response.json()
      console.log('提交成功:', result)
    } catch (e) {
      setError(e instanceof Error ? e.message : '未知错误')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <input {...register("name")} disabled={isLoading} />
      <button type="submit" disabled={isLoading}>
        {isLoading ? '提交中...' : '提交'}
      </button>
    </form>
  )
}
```

### 处理验证错误

```typescript
import { useForm, SubmitErrorHandler } from "react-hook-form"

type FormValues = {
  email: string
  password: string
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log('表单验证通过:', data)
    // 发送数据到服务器
  }

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.error('表单验证失败:', errors)
    // 处理验证错误，比如滚动到第一个错误字段
    const firstError = Object.keys(errors)[0]
    if (firstError) {
      document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <div>
        <input
          {...register("email", {
            required: "邮箱是必填项",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "邮箱格式不正确"
            }
          })}
          placeholder="邮箱"
        />
        {errors.email && (
          <span style={{ color: 'red' }}>{errors.email.message}</span>
        )}
      </div>

      <div>
        <input
          type="password"
          {...register("password", {
            required: "密码是必填项",
            minLength: {
              value: 8,
              message: "密码至少需要8个字符"
            }
          })}
          placeholder="密码"
        />
        {errors.password && (
          <span style={{ color: 'red' }}>{errors.password.message}</span>
        )}
      </div>

      <button type="submit">提交</button>
    </form>
  )
}
```

## 视频

下面的视频教程详细解释了 `handleSubmit` API。

## 相关 API

- [useForm](./useform.md) - 核心表单 hook
- [register](./register.md) - 注册输入框
- [formState](./formstate.md) - 表单状态
- [setError](./seterror.md) - 设置错误
- [clearErrors](./clearerrors.md) - 清除错误
