# register

注册非受控/受控输入

## `register: (name: string, options?: RegisterOptions) => ({ ref, name, onChange, onBlur })`

此方法允许您注册一个 input 或 select 元素，并将验证规则应用于 React Hook Form。验证规则都基于 HTML 标准，并允许自定义验证方法。

### 属性 (Props)

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `name` | string | 输入框的名称 |
| `options` | RegisterOptions | 输入框的行为配置 |

### 返回值 (Return)

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `ref` | React.ref | 用于连接 hook form 和输入框的 React 元素 ref |
| `name` | string | 正在注册的输入框名称 |
| `onChange` | ChangeHandler | 订阅输入框变更事件的 `onChange` 属性 |
| `onBlur` | ChangeHandler | 订阅输入框失焦事件的 `onBlur` 属性 |

### 注意

提交值的形式如下：

| 输入名称 | 提交结果 |
| --- | --- |
| `register("firstName")` | `{ firstName: value }` |
| `register("name.firstName")` | `{ name: { firstName: value } }` |
| `register("name.firstName.0")` | `{ name: { firstName: [ value ] } }` |

## 选项 (Options)

通过选择 register 选项，下方的 API 表格将会更新。

### 验证模式：仅验证

| 名称 | 描述 |
| --- | --- |
| `ref` | `React.Ref` - React 元素 `ref` |
| `required` | `boolean` - 表示输入框在表单提交前必须有值。注意：此配置与 web constrained API 的 required 输入验证一致，对于对象或数组类型的输入，请使用 validate 函数。 |
| `maxLength` | `number` - 接受的输入值的最大长度 |
| `minLength` | `number` - 接受的输入值的最小长度 |
| `max` | `number` - 接受的输入值的最大值 |
| `min` | `number` - 接受的输入值的最小值 |
| `pattern` | `RegExp` - 输入框的正则表达式模式。注意：带有 `/g` 标志的 `RegExp` 会跟踪上次匹配发生的索引。 |
| `validate` | `Function | Record<string, Function>` - 验证函数将独立执行，不依赖于 required 属性中包含的其他验证规则。注意：对于对象或数组输入数据，建议使用 validate 函数进行验证，因为其他规则主要适用于字符串、字符串数组、数字和布尔值。 |
| `valueAsNumber` | `boolean` - 通常返回 `Number`。如果出错则返回 `NaN`。 - `valueAs` 处理发生在验证**之前**。 - 仅适用于数字输入，但不进行任何数据操作。 - 不会转换 `defaultValue` 或 `defaultValues`。 |
| `valueAsDate` | `boolean` - 通常返回 `Date`。如果出错则返回 `Invalid Date`。 - `valueAs` 处理发生在验证**之前**。 - 仅适用于输入框。 - 不会转换 `defaultValue` 或 `defaultValues`。 |
| `setValueAs` | `<T>(value: any) => T` - 通过运行函数返回输入值。 - `valueAs` 处理发生在验证**之前**。如果 `valueAsNumber` 或 `valueAsDate` 为 true，`setValueAs` 将被忽略。 - 仅适用于文本输入。 - 不会转换 `defaultValue` 或 `defaultValues`。 |
| `disabled` | `boolean = false` - 将 `disabled` 设置为 `true` 会导致输入值为 `undefined` 并禁用输入控件。 - `disabled` 属性也会省略内置验证规则。 - 对于架构验证，可以利用从输入或上下文对象返回的 `undefined` 值。 |
| `onChange` | `(e: SyntheticEvent) => void` - 在变更事件中调用的 `onChange` 函数事件 |
| `onBlur` | `(e: SyntheticEvent) => void` - 在失焦事件中调用的 `onBlur` 函数事件 |
| `value` | `unknown` - 为已注册的输入设置 `value`。此属性应在 `useEffect` 中使用或调用一次，每次重新运行都会更新或覆盖您提供的输入值。 |
| `shouldUnregister` | `boolean` - 输入将在卸载后注销，`defaultValues` 也将被删除。注意：与 `useFieldArray` 一起使用时应避免此属性，因为 unregister 函数在输入卸载/重新挂载和重新排序后调用。 |
| `deps` | `string | string[]` - 将触发依赖输入的验证，仅限于 register api 而非 trigger。 |

### 验证模式：验证和错误消息

| 名称 | 描述 |
| --- | --- |
| `ref` | `React.Ref` - React 元素 `ref` |
| `required` | `string \| { value: boolean, message: string }` - 表示输入框在表单提交前必须有值。注意：此配置与 web constrained API 的 required 输入验证一致，对于对象或数组类型的输入，请使用 validate 函数。 |
| `maxLength` | `{ value: number, message: string }` - 接受的输入值的最大长度 |
| `minLength` | `{ value: number, message: string }` - 接受的输入值的最小长度 |
| `max` | `{ value: number, message: string }` - 接受的输入值的最大值 |
| `min` | `{ value: number, message: string }` - 接受的输入值的最小值 |
| `pattern` | `{ value: RegExp, message: string }` - 输入框的正则表达式模式。注意：带有 `/g` 标志的 `RegExp` 会跟踪上次匹配发生的索引。 |
| `validate` | ` Function | Record<string, Function> ` - 验证函数将独立执行，不依赖于 required 属性中包含的其他验证规则。注意：对于对象或数组输入数据，建议使用 validate 函数进行验证，因为其他规则主要适用于字符串、字符串数组、数字和布尔值。 |
| `valueAsNumber` | `boolean` - 通常返回 `Number`。如果出错则返回 `NaN`。 - `valueAs` 处理发生在验证**之前**。 - 仅适用于数字输入，但不进行任何数据操作。 - 不会转换 `defaultValue` 或 `defaultValues`。 |
| `valueAsDate` | `boolean` - 通常返回 `Date`。如果出错则返回 `Invalid Date`。 - `valueAs` 处理发生在验证**之前**。 - 仅适用于输入框。 - 不会转换 `defaultValue` 或 `defaultValues`。 |
| `setValueAs` | `<T>(value: any) => T` - 通过运行函数返回输入值。 - `valueAs` 处理发生在验证**之前**。如果 `valueAsNumber` 或 `valueAsDate` 为 true，`setValueAs` 将被忽略。 - 仅适用于文本输入。 - 不会转换 `defaultValue` 或 `defaultValues`。 |
| `disabled` | `boolean = false` - 将 `disabled` 设置为 `true` 会导致输入值为 `undefined` 并禁用输入控件。 - `disabled` 属性也会省略内置验证规则。 - 对于架构验证，可以利用从输入或上下文对象返回的 `undefined` 值。 |
| `onChange` | `(e: SyntheticEvent) => void` - 在变更事件中调用的 `onChange` 函数事件 |
| `onBlur` | `(e: SyntheticEvent) => void` - 在失焦事件中调用的 `onBlur` 函数事件 |
| `value` | `unknown` - 为已注册的输入设置 `value`。此属性应在 `useEffect` 中使用或调用一次，每次重新运行都会更新或覆盖您提供的输入值。 |
| `shouldUnregister` | `boolean` - 输入将在卸载后注销，`defaultValues` 也将被删除。注意：与 `useFieldArray` 一起使用时应避免此属性，因为 unregister 函数在输入卸载/重新挂载和重新排序后调用。 |
| `deps` | `string | string[]` - 将触发依赖输入的验证，仅限于 register api 而非 trigger。 |

## 规则 (RULES)

- 名称是**必需的**且**唯一的**（原生 radio 和 checkbox 除外）。输入名称支持点语法和方括号语法，这允许您轻松创建嵌套表单字段。
- 名称不能以数字开头，也不能使用数字作为键名。同时请避免使用特殊字符。
- 我们仅为了 TypeScript 使用一致性而使用点语法，因此方括号 `[]` 不适用于数组表单值。

  ```javascript
  register('test.0.firstName'); // ✅

  register('test[0]firstName'); // ❌
  ```

- 禁用的输入将导致表单值为 undefined。如果您想阻止用户更新输入，可以使用 `readOnly` 或禁用整个 `fieldset`。这里有一个示例。
- 要生成字段数组，输入名称后应跟一个点号和数字。例如：`test.0.data`
- 在每次渲染时更改名称将导致注册新的输入。建议为每个注册的输入保持静态名称。
- 输入值和引用将不再基于卸载而被删除。您可以调用 unregister 来删除该值和引用。
- 不能通过 `undefined` 或 `{}` 删除单个 register 选项。您可以更新单个属性。

  ```javascript
  register('test', { required: true });

  register('test', {}); // ❌

  register('test', undefined); // ❌

  register('test', { required: false });  // ✅
  ```

- 有某些关键字需要避免，以免与类型检查冲突。它们是 `ref`、`_f`。

## 示例 (Examples)

### 注册输入或选择框

```javascript
import { useForm } from "react-hook-form"

export default function App() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      category: "",
      checkbox: [],
      radio: "",
    },
  })

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input
        {...register("firstName", { required: true })}
        placeholder="First name"
      />
      <input
        {...register("lastName", { minLength: 2 })}
        placeholder="Last name"
      />
      <select {...register("category")}>
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>
      <input {...register("checkbox")} type="checkbox" value="A" />
      <input {...register("checkbox")} type="checkbox" value="B" />
      <input {...register("checkbox")} type="checkbox" value="C" />
      <input {...register("radio")} type="radio" value="A" />
      <input {...register("radio")} type="radio" value="B" />
      <input {...register("radio")} type="radio" value="C" />
      <input type="submit" />
    </form>
  )
}
```

### 自定义异步验证

```javascript
import { useForm } from "react-hook-form"
import { checkProduct } from "./service"

export default function App() {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <select
        {...register("category", {
          required: true,
        })}
      >
        <option value="">Select...</option>
        <option value="A">Category A</option>
        <option value="B">Category B</option>
      </select>
      <input
        type="text"
        {...register("product", {
          validate: {
            checkAvailability: async (product, { category }) => {
              if (!category) return "Choose a category"
              if (!product) return "Specify your product"
              const isInStock = await checkProduct(category, product)
              return isInStock || "There is no such product"
            },
          },
        })}
      />
      <input type="submit" />
    </form>
  )
}
```

## 提示 (Tips)

### 解构赋值

```javascript
const { onChange, onBlur, name, ref } = register('firstName');

// 包含针对您提供的字段路径的类型检查
<input
  onChange={onChange} // 分配 onChange 事件
  onBlur={onBlur}     // 分配 onBlur 事件
  name={name}         // 分配 name 属性
  ref={ref}           // 分配 ref 属性
/>

// 与上述相同
<input {...register('firstName')} />
```

### 自定义注册

您也可以使用 `useEffect` 注册输入并将它们视为虚拟输入。对于受控组件，我们提供了自定义 hook useController 和 Controller 组件来为您处理此过程。

如果您选择手动注册字段，则需要使用 setValue 更新输入值。

```javascript
register('firstName', { required: true, min: 8 });

<TextInput onTextChange={(value) => setValue('lastChange', value))} />
```

### 如何使用 `innerRef`、`inputRef`？

当自定义输入组件未正确暴露 ref 时，您可以通过以下方式使其工作。

```javascript
// 不工作，因为 ref 未被分配
<TextInput {...register('test')} />

const firstName = register('firstName', { required: true })
<TextInput
  name={firstName.name}
  onChange={firstName.onChange}
  onBlur={firstName.onBlur}
  inputRef={firstName.ref} // 对于不同的 ref 名称（如 innerRef）可以实现相同的效果
/>
```
