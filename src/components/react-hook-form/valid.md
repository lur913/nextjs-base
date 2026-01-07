# React Hook Form 校验选项

本文档整理了 `register` 方法可用的所有校验选项。

> 官方文档：https://react-hook-form.com/docs/useform/register

## 校验选项列表

### required
- **类型**: `boolean`
- **描述**: 指示输入框在提交表单前必须有值
- **注意**: 此配置与 Web 受限 API 的 required 输入校验对齐，对于对象或数组类型的输入，应使用 `validate` 函数代替

### maxLength
- **类型**: `number`
- **描述**: 接受的值的最大长度
- **适用类型**: 字符串（string）和数组（array）

### minLength
- **类型**: `number`
- **描述**: 接受的值的最小长度
- **适用类型**: 字符串（string）和数组（array）

### max
- **类型**: `number`
- **描述**: 接受的最大值
- **适用类型**: 数字（number）、日期（date）、时间（time）等可比较的值类型

### min
- **类型**: `number`
- **描述**: 接受的最小值
- **适用类型**: 数字（number）、日期（date）、时间（time）等可比较的值类型

### pattern
- **类型**: `RegExp`
- **描述**: 输入框的正则表达式模式
- **适用类型**: 字符串（string）
- **注意**: 带有 `/g` 标志的 RegExp 会跟踪上次匹配出现的索引位置

### validate
- **类型**: `Function | Record<string, Function>`
- **描述**: 验证函数将独立执行，不依赖于 required 属性中包含的其他验证规则
- **注意**: 对于对象或数组输入数据，建议使用 `validate` 函数进行验证，因为其他规则主要适用于字符串、字符串数组、数字和布尔值
- **示例**:
  ```tsx
  // 单个验证函数
  register('firstName', {
    validate: value => value === 'bill'
  })

  // 多个验证函数
  register('name', {
    validate: {
      positive: v => parseInt(v) > 0,
      lessThanTen: v => parseInt(v) < 10,
      checkUrl: async v => await fetch(v)
    }
  })
  ```

## 值转换选项

### valueAsNumber
- **类型**: `boolean`
- **描述**: 正常情况下返回 Number。如果出现错误则返回 NaN
- **注意**:
  - 值转换过程在验证之前发生
  - 仅适用于 number 输入，但不进行任何数据操作
  - 不会转换 defaultValue 或 defaultValues

### valueAsDate
- **类型**: `boolean`
- **描述**: 正常情况下返回 Date。如果出现错误则返回 Invalid Date
- **注意**:
  - 值转换过程在验证之前发生
  - 仅适用于 datetime-local、date 类型的输入
  - 不会转换 defaultValue 或 defaultValues

### setValueAs
- **类型**: `<T>(value: any) => T`
- **描述**: 通过运行函数来返回输入值
- **注意**:
  - 值转换过程在验证之前发生
  - 如果 `valueAsNumber` 或 `valueAsDate` 为 true，则会忽略 `setValueAs`
  - 仅适用于文本输入
  - 不会转换 defaultValue 或 defaultValues
- **示例**:
  ```tsx
  register('test', {
    setValueAs: value => parseInt(value)
  })
  ```

## 其他选项

### disabled
- **类型**: `boolean = false`
- **描述**:
  - 将 disabled 设置为 true 会导致输入值为 undefined 并禁用输入控件
  - disabled 属性也会省略内置验证规则
  - 对于 schema 验证，可以利用从输入或 context 对象返回的 undefined 值

### onChange
- **类型**: `(e: SyntheticEvent) => void`
- **描述**: 在 change 事件中调用的 onChange 函数事件

### onBlur
- **类型**: `(e: SyntheticEvent) => void`
- **描述**: 在 blur 事件中调用的 onBlur 函数事件

### value
- **类型**: `unknown`
- **描述**: 为注册的输入设置值
- **注意**: 此属性应该在 useEffect 中使用或仅调用一次，每次重新运行都会更新或覆盖您提供的输入值

### shouldUnregister
- **类型**: `boolean`
- **描述**: 输入将在卸载后注销，defaultValues 也将被删除
- **注意**: 与 `useFieldArray` 一起使用时应避免使用此属性，因为 unregister 函数在输入卸载/重新挂载和重新排序之后被调用

### deps
- **类型**: `string | string[]`
- **描述**: 将为依赖的输入触发验证，仅限于 register API，不会触发

## 使用示例

```tsx
import { useForm } from 'react-hook-form'

function MyForm() {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 必填字段 */}
      <input {...register('firstName', { required: true })} />

      {/* 长度验证 */}
      <input {...register('password', {
        minLength: 8,
        maxLength: 20
      })} />

      {/* 数值范围 */}
      <input type="number" {...register('age', {
        min: 18,
        max: 100,
        valueAsNumber: true
      })} />

      {/* 正则表达式 */}
      <input {...register('email', {
        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
      })} />

      {/* 自定义验证 */}
      <input {...register('username', {
        validate: value => value.length >= 6 || '用户名至少6个字符'
      })} />

      {/* 日期转换 */}
      <input type="date" {...register('birthDate', {
        valueAsDate: true,
        required: true
      })} />

      <button type="submit">提交</button>
    </form>
  )
}
```

## 注意事项

1. **对象和数组验证**: 对于复杂的数据类型（对象、数组），推荐使用 `validate` 函数进行验证
2. **值转换顺序**: `valueAsNumber`、`valueAsDate` 和 `setValueAs` 的处理过程在验证之前发生
3. **disabled 状态**: 被禁用的输入值将为 undefined，并且会跳过内置验证规则
4. **正则表达式**: 避免使用带有 `/g` 标志的正则表达式，因为它会保留匹配位置的状态
