# unregister

注销非受控/受控输入

## `unregister: (name: string | string[], options?) => void`

此方法允许您注销单个输入或一组输入。它还提供了第二个可选参数,用于在注销输入后保留状态。

### 属性 (Props)

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `name` | string \| string[] | 要注销的输入名称或输入名称数组 |
| `options` | object | 配置对象,用于控制注销后的行为 |

下面的示例展示了调用 `unregister` 方法时的预期行为。

```javascript
<input {...register('yourDetails.firstName')} />

<input {...register('yourDetails.lastName')} />
```

| 类型 | 输入名称 | 值 |
| --- | --- | --- |
| string | `unregister("yourDetails")` | `{}` |
| string | `unregister("yourDetails.firstName")` | `{ lastName: '' }` |
| string[] | `unregister(["yourDetails.lastName"])` | `''` |

### 选项 (Options)

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `keepDirty` | boolean | `isDirty` 和 `dirtyFields` 将在此操作期间保留。但是,这不能保证下一次用户输入不会更新 `isDirty` 表单状态,因为 `isDirty` 是相对于 `defaultValues` 测量的。 |
| `keepTouched` | boolean | `touchedFields` 在注销后将不再移除该输入。 |
| `keepIsValid` | boolean | `isValid` 将在此操作期间保留。但是,这不能保证下一次用户输入不会更新架构验证的 `isValid`,您需要根据注销情况调整架构。 |
| `keepError` | boolean | `errors` 将不会被更新。 |
| `keepValue` | boolean | 输入的当前 `value` 将不会被更新。 |
| `keepDefaultValue` | boolean | 在 `useForm` 中定义的输入 `defaultValue` 将被保留。 |

## 规则 (RULES)

- 此方法将移除输入引用及其值,这意味着**内置验证**规则也将被移除。
- 通过 `unregister` 注销输入不会影响架构验证。

  ```javascript
  const schema = yup
    .object()
    .shape({
      firstName: yup.string().required(),
    })
    .required()

  unregister("firstName") // 这不会移除对 firstName 输入的验证
  ```

- 确保卸载具有 `register` 回调的输入,否则输入将被再次注册。

  ```javascript
  const [show, setShow] = React.useState(true)

  const onClick = () => {
    unregister("test")
    setShow(false) // 确保卸载该输入,以免 register 再次被调用。
  }

  show && <input {...register("test")} />
  ```

## 示例 (Examples)

```javascript
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"

interface IFormInputs {
  firstName: string
  lastName?: string
}

export default function App() {
  const { register, handleSubmit, unregister } = useForm<IFormInputs>()
  const onSubmit = (data: IFormInputs) => console.log(data)

  React.useEffect(() => {
    register("lastName")
  }, [register])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="button" onClick={() => unregister("lastName")}>
        unregister
      </button>
      <input type="submit" />
    </form>
  )
}
```

## 视频

- [查看官方视频教程](https://www.youtube.com/watch?v=9IgtDM_q7Ig)

## 感谢您的支持

如果您发现 React Hook Form 在您的项目中很有用,请考虑给它一个 star 并支持它。
