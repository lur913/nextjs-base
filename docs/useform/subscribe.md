# subscribe

订阅表单状态更新而不触发重新渲染

## 概述

Subscribe to `formState` changes and value updates. You can subscribe to individual fields or the entire form, while avoiding unnecessary re-renders caused by form changes.

订阅 `formState` 变化和值更新。您可以订阅单个字段或整个表单,同时避免由表单变化导致的不必要的重新渲染。

## 类型签名

```typescript
subscribe: UseFormSubscribe<TFieldValues extends FieldValues>
```

---

## 参数

| 名称 | 类型 | 描述 | 示例 |
| --- | --- | --- | --- |
| `name` | `undefined` | 订阅整个表单 | `subscribe()` |
| | `string[]` | 通过**名称**订阅多个字段 | `subscribe({ name: ['firstName', 'lastName'] })` |
| `formState` | `Partial<ReadFormState>` | 选择要订阅的 `formState` | ```subscribe({ formState: { values: true, isDirty: true, dirtyFields: true, touchedFields: true, isValid: true, errors: true, validatingFields: true, isValidating: true } })``` |
| `callback` | `Function` | 订阅的回调函数 | ```subscribe({ formState: { values: true }, callback: ({ values }) => { console.log(values) } })``` |
| `exact` | `boolean` | 此属性将为输入名称订阅启用精确匹配 | `subscribe({ name: 'target', exact: true })` |

---

## 注意事项

- 此函数仅用于订阅变化;不允许分发状态更新或触发重新渲染。例如 `setValue` 或 `reset`
- 此函数与 `createFormControl.subscribe` 共享相同的功能,主要区别在于 createFormControl 可以在 React 组件外部初始化
- 此函数专用于订阅表单状态而**不渲染**,请使用此函数而不是 watch 回调函数

---

## 示例

### TypeScript

```tsx
import { useForm } from "react-hook-form"

type FormInputs = {
  firstName: string
  lastName: string
}

export default function App() {
  const { register, subscribe } = useForm<FormInputs>()

  useEffect(() => {
    // 确保取消订阅
    const callback = subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        console.log(values)
      },
    })

    return () => callback()

    // 您也可以直接返回 subscribe
    // return subscribe();
  }, [subscribe])

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
    </form>
  )
}
```

### JavaScript

```jsx
import { useForm } from "react-hook-form"

export default function App() {
  const { register, subscribe } = useForm()

  useEffect(() => {
    // 确保取消订阅
    const callback = subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        console.log(values)
      },
    })

    return () => callback()

    // 您也可以直接返回 subscribe
    // return subscribe();
  }, [subscribe])

  return (
    <form>
      <input {...register("firstName", { required: true })} />
      <input {...register("lastName", { required: true })} />
    </form>
  )
}
```

---

## 与 watch 的区别

`subscribe` 和 `watch` 都可以监听表单变化,但它们有以下关键区别:

### subscribe
- **不触发重新渲染**: 适用于监听变化但不需要更新 UI 的场景
- **更轻量**: 适合在副作用、日志记录或外部同步中使用
- **灵活性**: 可以精确订阅特定的 formState 属性

### watch
- **触发重新渲染**: 适用于需要在 UI 中显示当前值的场景
- **返回值**: 直接返回字段值,可以在组件中使用
- **响应式**: 变化时会触发组件重新渲染

### 使用建议

```tsx
// ❌ 使用 watch 导致不必要的重新渲染
useEffect(() => {
  const value = watch("field")
  console.log("Field changed:", value)
}, [watch])

// ✅ 使用 subscribe 避免重新渲染
useEffect(() => {
  const unsubscribe = subscribe({
    name: "field",
    callback: (data) => {
      console.log("Field changed:", data)
    }
  })
  return unsubscribe
}, [subscribe])
```

---

## 感谢您的支持

如果您发现 React Hook Form 在您的项目中很有用,请考虑在 GitHub 上 star 并支持我们。

[在 GitHub 上给我们 Star](https://github.com/react-hook-form/react-hook-form)
