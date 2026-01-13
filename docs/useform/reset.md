# reset

重置整个表单状态、字段引用和订阅。有可选参数，允许部分重置表单状态。

## Props

`reset` 能够保留 formState。以下是您可以使用的选项：

| 名称 |  | 类型 | 描述 |
| --- | --- | --- | --- |
| `values` |  | object \| (values: Object) => Object | 一个可选对象，用于重置表单值，如果提供，建议提供完整的 `defaultValues` |
| `options` | `keepErrors` | boolean | 所有错误将保留。这不保证在进一步的用户操作后仍然保留 |
|  | `keepDirty` | boolean | `DirtyFields` 表单状态将保留，`isDirty` 将暂时保持当前状态，直到用户的进一步操作。**重要：**此保留选项不反映表单输入值，仅反映 dirty 字段的表单状态 |
|  | `keepDirtyValues` | boolean | `DirtyFields` 和 `isDirty` 将保留，只有非 dirty 字段将被更新到最新的重置值。查看示例。**重要：**需要订阅 formState `dirtyFields` |
|  | `keepValues` | boolean | 表单输入值将保持不变 |
|  | `keepDefaultValues` | boolean | 保持通过 `useForm` 初始化的相同 defaultValues。- `isDirty` 将重新检查：它被设置为任何新提供的值与原始 `defaultValues` 的比较结果。- `dirtyFields` 将在提供值时再次更新：它被设置为提供的新值与原始 `defaultValues` 之间的比较结果 |
|  | `keepIsSubmitted` | boolean | `isSubmitted` 状态将保持不变 |
|  | `keepTouched` | boolean | `isTouched` 状态将保持不变 |
|  | `keepIsValid` | boolean | `isValid` 将暂时保持当前状态，直到额外的用户操作 |
|  | `keepSubmitCount` | boolean | `submitCount` 状态将保持不变 |

## RULES

- 对于受控组件，您需要将 `defaultValues` 传递给 `useForm`，以便 `reset` `Controller` 组件的值
- 当没有向 `reset` API 提供 `defaultValues` 时，将调用 HTML 原生 reset API 来恢复表单
- 避免在 `useForm` 的 `useEffect` 被调用之前调用 `reset`，这是因为 `useForm` 的订阅需要在 `reset` 能够发送信号以刷新表单状态更新之前准备好
- 建议在提交后在 `useEffect` 中 `reset`

  ```tsx
  useEffect(() => {
    reset({
      data: "test",
    })
  }, [isSubmitSuccessful])
  ```

- 只要在 useForm 处提供了 `defaultValues`，就可以不带参数地运行 `reset`

  ```tsx
  reset() // 将表单更新回默认值

  reset({ test: "test" }) // 更新您的 defaultValues && 表单值

  reset(undefined, { keepDirtyValues: true }) // 重置其他表单状态，但保留 defaultValues 和表单值
  ```

## Examples

### Uncontrolled

**TypeScript**

```tsx
import { useForm } from "react-hook-form"

interface UseFormInputs {
  firstName: string
  lastName: string
}

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UseFormInputs>()

  const onSubmit = (data: UseFormInputs) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>First name</label>
      <input {...register("firstName", { required: true })} />
      <label>Last name</label>
      <input {...register("lastName")} />
      <input type="submit" />
      <input type="reset" value="Standard Reset Field Values" />
      <input
        type="button"
        onClick={() => reset()}
        value="Custom Reset Field Values & Errors"
      />
    </form>
  )
}
```

**JavaScript**

```jsx
import React, { useCallback } from "react"
import { useForm } from "react-hook-form"

export default function App() {
  const { register, handleSubmit, reset } = useForm()

  const resetAsyncForm = useCallback(async () => {
    const result = await fetch("./api/formValues.json") // result: { firstName: 'test', lastName: 'test2' }
    reset(result) // 异步重置您的表单值
  }, [reset])

  useEffect(() => {
    resetAsyncForm()
  }, [resetAsyncForm])

  return (
    <form onSubmit={handleSubmit((data) => {})}>
      <input {...register("firstName")} />
      <input {...register("lastName")} />
      <input
        type="button"
        onClick={() => {
          reset(
            {
              firstName: "bill",
            },
            {
              keepErrors: true,
              keepDirty: true,
            }
          )
        }}
      />
      <button
        onClick={() => {
          reset((formValues) => ({
            ...formValues,
            lastName: "test",
          }))
        }}
      >
        Reset partial
      </button>
    </form>
  )
}
```

### Controller

**TypeScript**

```tsx
import { useForm, Controller } from "react-hook-form"
import { TextField } from "@material-ui/core"

interface IFormInputs {
  firstName: string
  lastName: string
}

export default function App() {
  const { register, handleSubmit, reset, setValue, control } =
    useForm<IFormInputs>()

  const onSubmit = (data: IFormInputs) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => <TextField {...field} />}
        name="firstName"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        render={({ field }) => <TextField {...field} />}
        name="lastName"
        control={control}
        defaultValue=""
      />
      <input type="submit" />
      <input type="button" onClick={reset} />
      <input
        type="button"
        onClick={() => {
          reset({
            firstName: "bill",
            lastName: "luo",
          })
        }}
      />
    </form>
  )
}
```

**JavaScript**

```jsx
import { useForm, Controller } from "react-hook-form"
import { TextField } from "@material-ui/core"

export default function App() {
  const { register, handleSubmit, reset, setValue, control } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => <TextField {...field} />}
        name="firstName"
        control={control}
        rules={{ required: true }}
        defaultValue=""
      />
      <Controller
        render={({ field }) => <TextField {...field} />}
        name="lastName"
        control={control}
        defaultValue=""
      />
      <input type="submit" />
      <input type="button" onClick={reset} />
      <input
        type="button"
        onClick={() => {
          reset({
            firstName: "bill",
            lastName: "luo",
          })
        }}
      />
    </form>
  )
}
```

### Submit with Reset

```jsx
import { useForm, useFieldArray, Controller } from "react-hook-form"

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues: { something: "anything" } })

  const onSubmit = (data) => {
    // 建议在 useEffect 中重置，因为执行顺序很重要
    // reset({ ...data })
  }

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ something: "" })
    }
  }, [formState, submittedData, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("something")} />
      <input type="submit" />
    </form>
  )
}
```

### Field Array

```jsx
import React, { useEffect } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"

function App() {
  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      loadState: "unloaded",
      names: [{ firstName: "Bill", lastName: "Luo" }],
    },
  })

  const { fields, remove } = useFieldArray({
    control,
    name: "names",
  })

  useEffect(() => {
    reset({
      names: [
        {
          firstName: "Bob",
          lastName: "Actually",
        },
        {
          firstName: "Jane",
          lastName: "Actually",
        },
      ],
    })
  }, [reset])

  const onSubmit = (data) => console.log("data", data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <input {...register(`names.${index}.firstName`)} />
            <Controller
              render={({ field }) => <input {...field} />}
              name={`names.${index}.lastName`}
              control={control}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input type="submit" />
    </form>
  )
}
```

## Videos

# Thank you for your support

如果您发现 React Hook Form 在您的项目中很有用，请考虑 star 并支持它。

[在 GitHub 上 Star 我们](https://github.com/react-hook-form/react-hook-form)
