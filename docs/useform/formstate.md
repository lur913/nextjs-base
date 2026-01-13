# formState

表单状态对象

## `formState: Object`

这个对象包含整个表单状态的信息。它帮助你跟踪用户与表单应用程序的交互。

---

## 返回值

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `isDirty` | boolean | 在用户修改任何输入后设置为 `true`<br><br>**重要提示**: 确保在 `useForm` 中提供所有输入的 `defaultValues`，以便 hook form 可以有一个单一的真实来源来比较表单是否脏。<br><br>```js<br>const {<br>  formState: { isDirty, dirtyFields },<br>  setValue<br>} = useForm({ defaultValues: { test: "" } })<br><br>// isDirty: true ✅<br>setValue('test', 'change')<br><br>// isDirty: false 因为 getValues() === defaultValues ❌<br>setValue('test', '')<br>```<br><br>- 文件类型输入需要在应用级别管理，因为用户可以取消文件选择，并且由于 FileList 对象的特性<br>- 不支持自定义对象、Class 或 File 对象 |
| `dirtyFields` | object | 包含用户修改过的字段的对象。确保通过 `useForm` 提供所有输入的 `defaultValues`，以便库可以与 `defaultValues` 进行比较。<br><br>**重要提示**: 确保在 `useForm` 中提供 `defaultValues`，以便 hook form 可以有一个单一的真实来源来比较每个字段的脏状态。<br><br>- 脏字段**不会**表示为 `isDirty` `formState`，因为脏字段是在字段级别标记字段脏状态，而不是整个表单。如果你想确定整个表单状态，请改用 `isDirty` |
| `touchedFields` | object | 包含用户与之交互的所有输入的对象 |
| `defaultValues` | object | 在 useForm 的 `defaultValues` 中设置的值，或通过 reset API 更新的 `defaultValues` |
| `isSubmitted` | boolean | 在表单提交后设置为 `true`。在调用 `reset` 方法之前将保持 `true` |
| `isSubmitSuccessful` | boolean | 指示表单是否已成功提交且没有任何运行时错误 |
| `isSubmitting` | boolean | 如果表单当前正在提交，则为 `true`，否则为 `false` |
| `isLoading` | boolean | 如果表单当前正在加载异步默认值，则为 `true`<br><br>**重要提示**: 此属性仅适用于异步 `defaultValues`<br><br>```js<br>const {<br>  formState: { isLoading }<br>} = useForm({<br>  defaultValues: async () => await fetch('/api')<br>})<br>``` |
| `submitCount` | number | 表单被提交的次数 |
| `isValid` | boolean | 如果表单没有任何错误，则设置为 `true`<br><br>- `setError` 对 `isValid` `formState` 没有影响，`isValid` 将始终通过整个表单验证结果派生 |
| `isValidating` | boolean | 在验证期间设置为 `true` |
| `validatingFields` | boolean | 捕获正在进行异步验证的字段 |
| `errors` | object | 包含字段错误的对象。还有一个 ErrorMessage 组件可以轻松检索错误消息 |
| `disabled` | boolean | 如果表单通过 useForm 中的 disabled prop 被禁用，则设置为 true |

---

## 规则

1. 返回的 `formState` 被包装在 Proxy 中以提高渲染性能，并在未订阅特定状态时跳过额外逻辑。因此，确保在渲染之前调用或读取它以启用状态更新。

2. `formState` 是批量更新的。如果你想通过 `useEffect` 订阅 `formState`，确保将整个 `formState` 放在可选数组中。

```ts
useEffect(() => {
  if (formState.errors.firstName) {
    // 在这里执行你的逻辑
  }
}, [formState]) // ✅

// ❌ [formState.errors] 不会触发 useEffect
```

```ts
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    formState
  } = useForm();

  const onSubmit = (data) => console.log(data);

  React.useEffect(() => {
    console.log("touchedFields", formState.touchedFields);
  }, [formState]); // 在 useEffect 中使用整个 formState 对象作为可选数组参数，而不是其单个属性

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("test")} />
      <input type="submit" />
    </form>
  );
};
```

3. 在订阅 `formState` 时要注意逻辑运算符。

```ts
// ❌ formState.isValid 被条件访问，
// 所以 Proxy 不会订阅该状态的变化
return <button disabled={!formState.isDirty || !formState.isValid} />;

// ✅ 读取所有 formState 值以订阅变化
const { isDirty, isValid } = formState;
return <button disabled={!isDirty || !isValid} />;
```

---

## 示例

```tsx
import React from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const {
    register,
    handleSubmit,
    // 在渲染之前读取 formState 以通过 Proxy 订阅表单状态
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("test")} />
      <input type="submit" />
    </form>
  );
}
```
