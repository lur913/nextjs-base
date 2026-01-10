# useForm

React hooks 用于表单验证

## `useForm: UseFormProps`

`useForm` 是一个用于轻松管理表单的自定义 hook。它接受一个对象作为**可选**参数。以下示例演示了其所有属性及其默认值。

### 通用属性

| 选项 | 描述 |
| --- | --- |
| mode | 提交行为**之前**的验证策略 |
| reValidateMode | 提交行为**之后**的验证策略 |
| defaultValues | 表单的默认值，该值将被缓存 |
| values | 用于更新表单值的响应式值 |
| errors | 服务器返回的错误以更新表单。**⚠ 重要提示：** 保持错误对象的引用稳定以避免无限重新渲染 |
| resetOptions | 在更新新表单值时重置表单状态更新的选项 |
| criteriaMode | 显示所有验证错误或一次显示一个 |
| shouldFocusError | 启用或禁用内置的焦点管理 |
| delayError | 延迟错误立即出现 |
| shouldUseNativeValidation | 使用浏览器内置的表单约束 API |
| shouldUnregister | 在卸载后启用和禁用输入的注销 |
| disabled | 禁用整个表单及所有关联的输入 |

### Schema 验证属性

| 选项 | 描述 |
| --- | --- |
| resolver | 与您首选的 schema 验证库集成 |
| context | 为您的 schema 验证提供的上下文对象 |

## Props

### mode: onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'
!React Native: 与 Controller 兼容

此选项允许您配置用户提交表单之前的验证策略。验证在 `onSubmit` 事件期间触发，该事件通过调用 `handleSubmit` 函数触发。

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| onSubmit | string | 在 `submit` 事件上触发验证，输入会附加 `onChange` 事件监听器以重新验证自身 |
| onBlur | string | 在 `blur` 事件上触发验证 |
| onChange | string | 在每个输入的 `change` 事件上触发验证，导致多次重新渲染。警告：这通常会对性能产生重大影响 |
| onTouched | string | 在第一个 `blur` 事件上初始触发验证。之后，它在每次 `change` 事件上触发。**注意：** 与 `Controller` 一起使用时，确保在 `render` prop 中连接 `onBlur` |
| all | string | 在 `blur` 和 `change` 事件上都触发验证 |

### reValidateMode: onChange | onBlur | onSubmit = 'onChange'
!React Native: 自定义 register 或使用 Controller

此选项允许您配置当有错误的输入在用户提交表单**之后**（`onSubmit` 事件和 `handleSubmit` 函数执行）重新验证时的验证策略。默认情况下，重新验证在输入更改事件期间发生。

### defaultValues: `FieldValues | () => Promise<FieldValues>`

`defaultValues` 属性使用默认值填充整个表单。它支持同步和异步的默认值分配。虽然您可以使用 `defaultValue` 或 `defaultChecked` 设置输入的默认值（如 React 官方文档中所述），但**建议**对整个表单使用 `defaultValues`。

```javascript
useForm({
  defaultValues: {
    firstName: '',
    lastName: ''
  }
})

// 异步设置默认值
useForm({
  defaultValues: async () => fetch('/api-endpoint');
})
```

**规则**

- 您**应该避免**提供 `undefined` 作为默认值，因为它与受控组件的默认状态冲突
- `defaultValues` 会被缓存。要重置它们，请使用 reset API
- `defaultValues` 默认将包含在提交结果中
- 建议避免使用包含原型方法的自定义对象，如 `Moment` 或 `Luxon`，作为 `defaultValues`
- 还有其他包含表单数据的选项：

  ```javascript
  // 添加隐藏输入
  <input {...register("hidden", { value: "data" })} type="hidden" />
  ```

  ```javascript
  // 在 onSubmit 中包含数据
  const onSubmit = (data) => {
    const output = {
      ...data,
      others: "others",
    }
  }
  ```

### values: FieldValues

`values` 属性会对更改做出反应并更新表单值，当您的表单需要由外部状态或服务器数据更新时，这很有用。`values` 属性将覆盖 `defaultValues` 属性，除非为 `useForm` 设置了 `resetOptions: { keepDefaultValues: true }`。

```javascript
// 同步设置默认值
function App({ values }) {
  useForm({
    values, // 当 values props 更新时会更新
  })
}

function App() {
  const values = useFetch("/api")
  useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
    values, // 当 values 返回时会更新
  })
}
```

### errors: FieldErrors

`errors` 属性会对更改做出反应并更新服务器错误状态，当您的表单需要由外部服务器返回的错误更新时，这很有用。

```javascript
function App() {
  const { errors, data } = useFetch("/api")
  useForm({
    errors, // 当 errors 返回时会更新
  })
}
```

### resetOptions: KeepStateOptions

此属性与值更新行为有关。当 `values` 或 `defaultValues` 更新时，会在内部调用 `reset` API。在 `values` 或 `defaultValues` 异步更新后指定所需的行为很重要。配置选项本身是对 reset 方法选项的引用。

```javascript
// 默认情况下，异步 value 或 defaultValues 更新将重置表单值
useForm({ values })
useForm({ defaultValues: async () => await fetch() })

// 配置行为的选项
// 例如：我想保留用户交互/脏值而不删除任何用户错误
useForm({
  values,
  resetOptions: {
    keepDirtyValues: true, // 用户交互的输入将被保留
    keepErrors: true, // 输入错误将随值更新被保留
  },
})
```

### context: object

|  |  |
| --- | --- |
| 这个上下文 `object` 是可变的，将被注入到 `resolver` 的第二个参数或 Yup 验证的上下文对象中 | CodeSandbox |

### criteriaMode: firstError | all

|  |  |
| --- | --- |
| - 当设置为 `firstError`（默认值）时，只收集每个字段的第一个错误<br/>- 当设置为 `all` 时，收集每个字段的所有错误 | CodeSandbox |

### shouldFocusError: boolean = true

当设置为 `true`（默认值）并且用户提交未通过验证的表单时，焦点将设置在有错误的第一个字段上。

**注意**

- 只有具有 `ref` 的已注册字段才能工作。自定义注册的输入不适用。例如：`register('test') // 不工作`
- 焦点顺序基于 `register` 顺序

### delayError: number

|  |  |
| --- | --- |
| 此配置将错误状态的显示延迟指定的毫秒数。如果用户更正了错误输入，错误将立即被移除，不应用延迟 | CodeSandbox |

### shouldUnregister: boolean = false

默认情况下，当输入被移除时，输入值将被保留。但是，您可以将 `shouldUnregister` 设置为 `true` 以在卸载期间注销输入。

- 这是一个全局配置，会覆盖子级配置。要具有单独的行为，请在组件或 hook 级别设置配置，而不是在 `useForm` 处
- 默认情况下，`shouldUnregister: false` 意味着卸载的字段**不会**被内置验证验证
- 在 `useForm` 级别将 `shouldUnregister` 设置为 true 时，`defaultValues` 将**不会**与提交结果合并
- 设置 `shouldUnregister: true` 使您的表单行为更接近原生表单
  - 表单值存储在输入本身中
  - 卸载输入会删除其值
  - 隐藏输入应该使用 `hidden` 属性来存储隐藏数据
  - 只有已注册的输入才包含在提交数据中
  - 必须在 `useForm` 或 `useWatch` 的 `useEffect` 中通知已卸载的输入，以便 hook 表单验证输入已从 DOM 卸载

    ```javascript
    const NotWork = () => {
      const [show, setShow] = React.useState(false)
      // ❌ 不会得到通知，需要调用 unregister
      return show && <input {...register("test")} />
    }
    const Work = ({ control }) => {
      const { show } = useWatch({ control })
      // ✅ 在 useEffect 得到通知
      return show && <input {...register("test1")} />
    }
    const App = () => {
      const [show, setShow] = React.useState(false)
      const { control } = useForm({ shouldUnregister: true })
      return (
        <div>
          // ✅ 在 useForm 的 useEffect 得到通知
          {show && <input {...register("test2")} />}
          <NotWork />
          <Work control={control} />
        </div>
      )
    }
    ```

### shouldUseNativeValidation: boolean = false

此配置将启用浏览器原生验证。它还将启用 CSS 选择器 `:valid` 和 `:invalid`，使样式输入更容易。即使禁用了客户端验证，您仍然可以使用这些选择器。

- 仅适用于 `onSubmit` 和 `onChange` 模式，因为 `reportValidity` 执行将聚焦错误输入
- 每个已注册字段的验证消息必须是字符串才能原生显示它们
- 此功能仅适用于与实际 DOM 引用连接的 `register` API 和 `useController/Controller`

**示例：**

```javascript
import { useForm } from "react-hook-form"

export default function App() {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  })
  const onSubmit = async (data) => {
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("firstName", {
          required: "Please enter your first name.",
        })} // 自定义消息
      />
      <input type="submit" />
    </form>
  )
}
```

### disabled: boolean = false

此配置允许您在设置为 `true` 时禁用整个表单和所有关联的输入。这对于在异步任务期间防止用户交互或输入应该暂时无响应的其他情况很有用。

**示例：**

```javascript
import { useForm, Controller } from "react-hook-form"

const App = () => {
  const [disabled, setDisabled] = useState(false)
  const { register, handleSubmit, control } = useForm({
    disabled,
  })
  return (
    <form
      onSubmit={handleSubmit(async () => {
        setDisabled(true)
        await sleep(100)
        setDisabled(false)
      })}
    >
      <input
        type="checkbox"
        {...register("checkbox")}
        data-testid="checkbox"
      />
      <select {...register("select")} data-testid="select" />
      <Controller
        control={control}
        render={({ field }) => <input disabled={field.disabled} />}
        name="test"
      />
      <button type="submit">Submit</button>
    </form>
  )
}
```

### resolver: Resolver

此函数允许您使用任何外部验证库，如 Yup、Zod、Joi、Vest、Ajv 和许多其他库。目标是确保您可以无缝集成您喜欢的任何验证库。如果您不使用库，您始终可以编写自己的逻辑来验证表单。

```bash
npm install @hookform/resolvers
```

#### Props

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| `values` | object | 此对象包含整个表单值 |
| `context` | object | 这是您可以提供给 `useForm` 配置的 `context` 对象。它是一个可以在每次重新渲染时更改的可变 `object` |
| `options` | `{ "criteriaMode": "string", "fields": "object", "names": "string[]" }` | 这是包含有关已验证字段、名称和来自 `useForm` 的 `criteriaMode` 信息的选项对象 |

**规则**

- Schema 验证专注于字段级错误报告。父级错误检查仅限于直接父级，适用于诸如复选框组之类的组件
- 此函数将被缓存
- 在用户交互期间，输入的重新验证一次只会发生一个字段。库本身将评估 `error` 对象以相应地触发重新渲染
- 解析器不能与内置验证器（例如：required、min 等）一起使用
- 构建自定义解析器时：
  - 确保返回一个同时包含 `values` 和 `errors` 属性的对象。它们的默认值应该是一个空对象。例如：`{}`
  - `error` 对象的键应该与字段的 `name` 值匹配

**示例：**

##### Yup

```javascript
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    age: yup.number().required(),
  })
  .required()

const App = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema), // yup、joi 甚至您自己的
  })
  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <input {...register("name")} />
      <input type="number" {...register("age")} />
      <input type="submit" />
    </form>
  )
}
```

##### Zod

```javascript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const schema = z.object({
  name: z.string(),
  age: z.number(),
})

type Schema = z.infer<typeof schema>

const App = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  })
  return (
    <form onSubmit={handleSubmit((data) => {
      // 处理输入
      console.log(data);
    })}>
      <input {...register("name")} />
      <input {...register("age", { valueAsNumber: true })} type="number" />
      <input type="submit" />
    </form>
  )
}
```

##### Joi

```javascript
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

interface IFormInput {
  name: string;
  age: number;
}

const schema = Joi.object({
  name: Joi.string().required(),
  age: Joi.number().required()
});

const App = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: joiResolver(schema)
  });
  const onSubmit = (data: IFormInput) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <input type="number" {...register("age")} />
      <input type="submit" />
    </form>
  );
};
```

##### Ajv

```javascript
import { useForm } from "react-hook-form"
import { ajvResolver } from "@hookform/resolvers/ajv"

// 必须使用 `minLength: 1` 来实现必填字段
const schema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 1,
      errorMessage: { minLength: "username field is required" },
    },
    password: {
      type: "string",
      minLength: 1,
      errorMessage: { minLength: "password field is required" },
    },
  },
  required: ["username", "password"],
  additionalProperties: false,
}

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: ajvResolver(schema),
  })
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("username")} />
      {errors.username && <p>{errors.username.message}</p>}
      <input {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit">submit</button>
    </form>
  )
}
```

##### Vest

```javascript
import * as React from "react"
import { useForm } from "react-hook-form"
import { vestResolver } from "@hookform/resolvers/vest"
import vest, { test, enforce } from "vest"

const validationSuite = vest.create((data = {}) => {
  test("username", "Username is required", () => {
    enforce(data.username).isNotEmpty()
  })
  test("username", "Must be longer than 3 chars", () => {
    enforce(data.username).longerThan(3)
  })
  test("password", "Password is required", () => {
    enforce(data.password).isNotEmpty()
  })
  test("password", "Password must be at least 5 chars", () => {
    enforce(data.password).longerThanOrEquals(5)
  })
  test("password", "Password must contain a digit", () => {
    enforce(data.password).matches(/[0-9]/)
  })
  test("password", "Password must contain a symbol", () => {
    enforce(data.password).matches(/[^A-Za-z0-9]/)
  })
})

const App = () => {
  const { register, handleSubmit } = useForm({
    resolver: vestResolver(validationSuite),
  })
  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("username")} />
      <input {...register("password")} />
      <input type="submit" />
    </form>
  )
}
```

##### Custom

```javascript
import * as React from "react"
import { useForm } from "react-hook-form"
import * as Joi from "joi"

interface IFormInputs {
  username: string
}

const validationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
})

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: async (data) => {
      const { error, value: values } = validationSchema.validate(data, {
        abortEarly: false,
      })
      return {
        values: error ? {} : values,
        errors: error
          ? error.details.reduce((previous, currentError) => {
              return {
                ...previous,
                [currentError.path[0]]: currentError,
              }
            }, {})
          : {},
      }
    },
  })
  const onSubmit = (data: IFormInputs) => console.log(data)
  return (
    <div className="App">
      <h1>resolver</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input {...register("username")} />
        {errors.username && <p>errors.username.message</p>}
        <input type="submit" />
      </form>
    </div>
  )
}
```

需要更多？请参阅 [Resolver 文档](https://react-hook-form.com/docs/useform/resolver)

**提示**

您可以通过以下代码片段调试您的 schema：

```javascript
resolver: async (data, context, options) => {
  // 您可以在这里调试您的验证 schema
  console.log("formData", data)
  console.log(
    "validation result",
    await anyResolver(schema)(data, context, options)
  )
  return anyResolver(schema)(data, context, options)
}
```

### `useForm` 返回值和 `useEffect` 依赖项

在未来的主要版本中，`useForm` 返回值将被记忆化以优化性能并反映 `formState` 的变化。

因此，将 `useForm` 的整个返回值添加到 `useEffect` 依赖列表可能会导致无限循环。

**警告**

以下代码可能会创建这种情况：

```javascript
const methods = useForm()
useEffect(() => {
  methods.reset({ ... })
}, [methods])
```

如下所示，仅传递相关方法应该可以避免此类问题：

```javascript
const methods = useForm()
useEffect(() => {
  methods.reset({ ... })
}, [methods.reset])
```

**提示**

推荐的方法是将解构的方法传递给 `useEffect` 的依赖项

```javascript
const { reset } = useForm()
useEffect(() => {
  reset({ ... })
}, [reset])
```

更多信息可以在 [此问题](https://github.com/react-hook-form/react-hook-form/issues/8935)中找到

## Return

以下列表包含对 `useForm` 返回属性的引用。

- [register](https://react-hook-form.com/docs/useform/register) - 注册输入/验证方法
- [unregister](https://react-hook-form.com/docs/useform/unregister) - 注销输入方法
- [formState](https://react-hook-form.com/docs/useform/formstate) - 表单状态对象
- [watch](https://react-hook-form.com/docs/useform/watch) - 监视输入/监听特定输入
- [subscribe](https://react-hook-form.com/docs/useform/subscribe) - 订阅表单状态更新
- [handleSubmit](https://react-hook-form.com/docs/useform/handlesubmit) - 表单提交处理程序
- [reset](https://react-hook-form.com/docs/useform/reset) - 重置表单方法
- [resetField](https://react-hook-form.com/docs/useform/resetfield) - 重置单个字段
- [setError](https://react-hook-form.com/docs/useform/seterror) - 设置错误方法
- [clearErrors](https://react-hook-form.com/docs/useform/clearerrors) - 清除错误方法
- [setValue](https://react-hook-form.com/docs/useform/setvalue) - 设置值方法
- [setFocus](https://react-hook-form.com/docs/useform/setfocus) - 设置焦点方法
- [getValues](https://react-hook-form.com/docs/useform/getvalues) - 获取表单值
- [getFieldState](https://react-hook-form.com/docs/useform/getfieldstate) - 获取字段状态
- [trigger](https://react-hook-form.com/docs/useform/trigger) - 手动触发验证
- [control](https://react-hook-form.com/docs/useform/control) - 控制对象
- [Form](https://react-hook-form.com/docs/useform/form) - Form 组件

---

# 感谢您的支持

如果您发现 React Hook Form 在您的项目中很有用，请考虑给它加星标并支持它。

[在 GitHub 上给我们加星](https://github.com/react-hook-form/react-hook-form)
