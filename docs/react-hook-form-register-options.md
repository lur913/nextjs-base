# React Hook Form - register 校验选项

## 概述

`register` 方法用于注册输入框或选择元素，并应用验证规则。验证规则基于 HTML 标准，同时支持自定义验证方法。

```typescript
register(name: string, options?: RegisterOptions) => ({ ref, name, onChange, onBlur })
```

---

## 基础校验选项

### required - 必填校验

指示输入框在表单提交前必须有值。

| 类型 | 说明 |
|------|------|
| `boolean` | 简单开关 |
| `{ value: boolean, message: string }` | 带错误消息 |

```typescript
// 简单用法
<input {...register("email", { required: true })} />

// 带自定义消息
<input {...register("username", { 
  required: "用户名不能为空" 
})} />

// 对象形式
<input {...register("phone", { 
  required: { 
    value: true, 
    message: "请输入手机号" 
  } 
})} />
```

> **注意**: 对于对象或数组类型的输入，建议使用 `validate` 函数。

---

### maxLength - 最大长度

限制输入值的最大字符数。

| 类型 | 说明 |
|------|------|
| `number` | 最大长度值 |
| `{ value: number, message: string }` | 带错误消息 |

```typescript
<input {...register("username", { maxLength: 20 })} />
<input {...register("bio", { maxLength: { value: 200, message: "最多200字符" } })} />
```

---

### minLength - 最小长度

限制输入值的最小字符数。

| 类型 | 说明 |
|------|------|
| `number` | 最小长度值 |
| `{ value: number, message: string }` | 带错误消息 |

```typescript
<input {...register("password", { minLength: 6 })} />
<input {...register("username", { minLength: { value: 3, message: "至少3个字符" } })} />
```

---

### max - 最大值

限制数值输入的最大值。

| 类型 | 说明 |
|------|------|
| `number` | 最大值 |
| `{ value: number, message: string }` | 带错误消息 |

```typescript
<input type="number" {...register("age", { max: 120 })} />
<input type="number" {...register("quantity", { max: { value: 100, message: "最大100" } })} />
```

---

### min - 最小值

限制数值输入的最小值。

| 类型 | 说明 |
|------|------|
| `number` | 最小值 |
| `{ value: number, message: string }` | 带错误消息 |

```typescript
<input type="number" {...register("age", { min: 18 })} />
<input type="number" {...register("quantity", { min: { value: 1, message: "最小1" } })} />
```

---

### pattern - 正则表达式

使用正则表达式验证输入格式。

| 类型 | 说明 |
|------|------|
| `RegExp` | 正则表达式 |
| `{ value: RegExp, message: string }` | 带错误消息 |

```typescript
// 邮箱验证
<input {...register("email", { 
  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
})} />

// 手机号验证（带消息）
<input {...register("phone", { 
  pattern: { 
    value: /^1[3-9]\d{9}$/, 
    message: "手机号格式不正确" 
  } 
})} />
```

> **注意**: 带 `/g` 标志的正则表达式会记录最后一次匹配的位置。

---

## 自定义验证

### validate - 自定义验证函数

独立执行的验证函数，不依赖于 required 等其他验证规则。

| 类型 | 说明 |
|------|------|
| `Function` | 单个验证函数 |
| `Record<string, Function>` | 多个验证函数 |

```typescript
// 单个验证函数
<input {...register("email", {
  validate: (value) => value.includes("@") || "必须包含@"
})} />

// 多个验证函数
<input {...register("password", {
  validate: {
    hasUpperCase: (value) => /[A-Z]/.test(value) || "需包含大写字母",
    hasLowerCase: (value) => /[a-z]/.test(value) || "需包含小写字母",
    hasNumber: (value) => /\d/.test(value) || "需包含数字",
    minLength: (value) => value.length >= 8 || "至少8个字符"
  }
})} />

// 异步验证
<input {...register("username", {
  validate: async (value) => {
    const res = await checkUsername(value);
    return res.available || "用户名已被占用";
  }
})} />

// 访问其他字段值
<input {...register("confirmPassword", {
  validate: (value, formValues) => 
    value === formValues.password || "两次密码不一致"
})} />
```

> **注意**: 对于对象或数组类型的输入数据，推荐使用 `validate` 函数。

---

## 值转换选项

### valueAsNumber - 转换为数字

将输入值转换为数字类型。

| 类型 | 默认值 | 说明 |
|------|--------|------|
| `boolean` | `false` | 返回数字，出错返回 NaN |

```typescript
<input type="text" {...register("age", { valueAsNumber: true })} />
```

**特点**:
- 转换过程在**验证之前**执行
- 只适用于 number 输入，不进行数据处理
- 不转换 `defaultValue`

```typescript
// 结果
// 输入 "25" -> 25 (number)
// 输入 "abc" -> NaN
```

---

### valueAsDate - 转换为日期

将输入值转换为 Date 对象。

| 类型 | 默认值 | 说明 |
|------|--------|------|
| `boolean` | `false` | 返回 Date 对象，出错返回 Invalid Date |

```typescript
<input type="text" {...register("birthDate", { valueAsDate: true })} />
```

**特点**:
- 转换过程在**验证之前**执行
- 只适用于 input
- 不转换 `defaultValue`

```typescript
// 结果
// 输入 "2024-01-01" -> Date 对象
// 输入 "invalid" -> Invalid Date
```

---

### setValueAs - 自定义值转换

通过函数自定义值转换逻辑。

| 类型 | 说明 |
|------|------|
| `<T>(value: any) => T` | 转换函数 |

```typescript
// 转换为大写
<input {...register("code", { setValueAs: (value) => value.toUpperCase() })} />

// 去除空格
<input {...register("username", { setValueAs: (value) => value.trim() })} />

// 转换为整数
<input {...register("quantity", { setValueAs: (value) => parseInt(value, 10) })} />
```

**特点**:
- 转换过程在**验证之前**执行
- 如果设置了 `valueAsNumber` 或 `valueAsDate`，则忽略此选项
- 只适用于 text 输入
- 不转换 `defaultValue`

---

## 其他选项

### disabled - 禁用输入

禁用输入框并将其值设置为 undefined。

| 类型 | 默认值 | 说明 |
|------|--------|------|
| `boolean` | `false` | 禁用输入并设为 undefined |

```typescript
<input {...register("disabledField", { disabled: true })} />

// 条件禁用
<input {...register("field", { disabled: isDisabled })} />
```

**特点**:
- 也会忽略内置的验证规则
- 对于 schema 验证，可利用返回的 undefined 值

---

### shouldUnregister - 卸载时取消注册

组件卸载后取消注册并移除默认值。

| 类型 | 默认值 | 说明 |
|------|--------|------|
| `boolean` | `true` | 卸载时移除注册和默认值 |

```typescript
<input {...register("field", { shouldUnregister: true })} />
```

**使用场景**：

```tsx
function MyComponent() {
  const { register } = useForm();

  return <input {...register("field", { shouldUnregister: true })} />;
}

// 当 MyComponent 卸载时：
// - field 会被取消注册
// - field 的值和默认值会被移除
// - 再次挂载会重新注册
```

**示例：条件渲染表单字段**

```tsx
function App() {
  const [showOptional, setShowOptional] = useState(false);
  const { register } = useForm();

  return (
    <form>
      <input {...register("requiredField", { required: true })} />
      
      {showOptional && (
        <input 
          {...register("optionalField", { 
            shouldUnregister: true  // 卸载时移除
          })} 
        />
      )}
      
      <button type="button" onClick={() => setShowOptional(!showOptional)}>
        {showOptional ? "隐藏可选字段" : "显示可选字段"}
      </button>
    </form>
  );
}
```

**与 useFieldArray 一起使用**：

```tsx
// 与 useFieldArray 一起使用时应避免 shouldUnregister: true
const { fields, append, remove } = useFieldArray({
  control,
  name: "items",
  shouldUnregister: false  // 不要设置为 true
});
```

> **注意**: 与 `useFieldArray` 一起使用时应避免此选项，因为取消注册函数会在输入框卸载/重新挂载和重新排序后调用。

---

### deps - 依赖字段验证

触发依赖字段的验证。

| 类型 | 说明 |
|------|------|
| `string` | 单个依赖字段 |
| `string[]` | 多个依赖字段 |

```typescript
<input {...register("email", {
  required: true,
  pattern: /^\S+@\S+$/i
})} />

<input {...register("confirmEmail", {
  required: true,
  validate: (value) => value === watch("email") || "邮箱不匹配",
  deps: ["email"]  // 当 email 变化时触发验证
})} />
```

> **注意**: 此选项仅限于 register API，不适用于 trigger。

---

### onChange - 变更事件处理

自定义 change 事件的处理函数。

| 类型 | 说明 |
|------|------|
| `(e: SyntheticEvent) => void` | 变更事件回调 |

```typescript
const { register } = useForm();

<input {...register("field", {
  onChange: (e) => console.log("changed:", e.target.value)
})} />
```

---

### onBlur - 失焦事件处理

自定义 blur 事件的处理函数。

| 类型 | 说明 |
|------|------|
| `(e: SyntheticEvent) => void` | 失焦事件回调 |

```typescript
const { register } = useForm();

<input {...register("field", {
  onBlur: () => console.log("blurred")
})} />
```

---

### value - 设置输入值

为已注册的输入设置初始值。

| 类型 | 说明 |
|------|------|
| `unknown` | 输入值 |

```typescript
// 推荐在 useEffect 中使用
useEffect(() => {
  setValue("field", initialValue);
}, [initialValue]);

// 或在 register 中设置
const { register } = useForm();

<input {...register("field", { value: initialValue })} />
```

> **注意**: 此选项应在 useEffect 中调用或只调用一次，每次重新运行会覆盖输入值。

---

## 完整示例

```typescript
import { useForm } from "react-hook-form";

interface FormData {
  username: string;
  email: string;
  password: string;
  age: number;
  birthDate: Date;
}

function App() {
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      age: 18,
      birthDate: new Date()
    }
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 基础校验 */}
      <input
        {...register("username", {
          required: "用户名不能为空",
          minLength: { value: 3, message: "至少3个字符" },
          maxLength: { value: 20, message: "最多20个字符" }
        })}
        placeholder="用户名"
      />

      {/* 正则校验 */}
      <input
        {...register("email", {
          required: "邮箱不能为空",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "邮箱格式不正确"
          }
        })}
        placeholder="邮箱"
      />

      {/* 自定义验证 */}
      <input
        {...register("password", {
          required: "密码不能为空",
          validate: {
            hasUpperCase: (value) => /[A-Z]/.test(value) || "需包含大写字母",
            hasLowerCase: (value) => /[a-z]/.test(value) || "需包含小写字母",
            hasNumber: (value) => /\d/.test(value) || "需包含数字",
            minLength: (value) => value.length >= 8 || "至少8个字符"
          }
        })}
        type="password"
        placeholder="密码"
      />

      {/* 值转换 */}
      <input
        type="text"
        {...register("age", { valueAsNumber: true })}
        placeholder="年龄"
      />

      <input
        type="text"
        {...register("birthDate", { valueAsDate: true })}
        placeholder="出生日期"
      />

      <button type="submit">提交</button>
    </form>
  );
}
```

---

## 规则与限制

1. **name 是必需且唯一的**（原生 radio 和 checkbox 除外）
2. **name 不能以数字开头**，也不能用数字作为键名，应避免特殊字符
3. **使用点语法**，方括号语法不适用于数组表单值
   - ✅ `register('test.0.firstName')`
   - ❌ `register('test[0]firstName')`
4. **禁用输入**会返回 undefined，如需阻止用户更新可使用 `readOnly`
5. **数组字段**使用点号加数字，如 `test.0.data`
6. **每次渲染更改 name** 会导致注册新输入，应保持静态
7. **无法通过 `undefined` 或 `{}` 移除单个 register 选项**，需显式更新属性
8. **避免关键字** `ref`、`_f`，会与类型检查冲突

---

## 字段名称格式

| 格式 | 提交结果 |
|------|----------|
| `register("firstName")` | `{ firstName: value }` |
| `register("name.firstName")` | `{ name: { firstName: value } }` |
| `register("name.firstName.0")` | `{ name: { firstName: [ value ] } }` |
