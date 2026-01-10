"use client";

import { useForm, Controller, SubmitHandler} from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react";

const inputClass = "block border border-gray-50 py-2 px-4 rounded";

// ==================== 示例 1: 基础条件表单 ====================
/**
 * 场景：选择用户类型，根据类型显示不同的字段
 * - 个人用户：显示姓名、身份证
 * - 企业用户：显示公司名称、统一社会信用代码
 */
const formSchema1 = z.discriminatedUnion("userType", [
  z.object({
    userType: z.literal("personal"),
    personalName: z.string().min(1, "姓名不能为空"),
    idCard: z.string().regex(/^\d{17}[\dXx]$/, "身份证号格式不正确"),
  }),
  z.object({
    userType: z.literal("company"),
    companyName: z.string().min(1, "公司名称不能为空"),
    creditCode: z.string().regex(/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/, "统一社会信用代码格式不正确"),
  }),
]);

type ConditionalForm1 = z.infer<typeof formSchema1>;

export function BasicConditionalForm() {
  const { control, handleSubmit, watch } = useForm<ConditionalForm1>({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      userType: "personal",
    },
  });

  const userType = watch("userType");

  const onSubmit: SubmitHandler<ConditionalForm1> = (data) => {
    console.log("提交的数据:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded">
      <h3 className="text-lg font-bold mb-4">基础条件表单示例</h3>

      {/* 用户类型选择 - 使用 Controller */}
      <Controller
        name="userType"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block mb-2">用户类型</label>
            <select {...field} className={inputClass}>
              <option value="personal">个人用户</option>
              <option value="company">企业用户</option>
            </select>
          </div>
        )}
      />

      {/* 条件渲染：个人用户字段 */}
      {userType === "personal" && (
        <>
          <Controller
            name="personalName"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="block mb-2">姓名</label>
                <input {...field} className={inputClass} />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="idCard"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="block mb-2">身份证号</label>
                <input {...field} className={inputClass} placeholder="18位身份证号" />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </>
      )}

      {/* 条件渲染：企业用户字段 */}
      {userType === "company" && (
        <>
          <Controller
            name="companyName"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="block mb-2">公司名称</label>
                <input {...field} className={inputClass} />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="creditCode"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="block mb-2">统一社会信用代码</label>
                <input {...field} className={inputClass} placeholder="18位统一社会信用代码" />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </>
      )}

      <button type="submit" className={inputClass + " bg-blue-500 text-white"}>
        提交
      </button>

      {/* 实时显示表单状态 */}
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="font-bold">当前选择: {userType === "personal" ? "个人用户" : "企业用户"}</p>
      </div>
    </form>
  );
}

// ==================== 示例 2: 动态验证规则的条件表单 ====================
/**
 * 场景：注册时选择是否启用二次验证
 * - 如果启用：需要设置手机号和验证码
 * - 如果不启用：只需要邮箱
 */
const formSchema2 = z.object({
  email: z.string().email("邮箱格式不正确"),
  enable2FA: z.boolean(),
  phone: z.string().optional(),
  verificationCode: z.string().optional(),
}).refine(
  (data) => {
    if (data.enable2FA) {
      return !!data.phone && !!data.verificationCode;
    }
    return true;
  },
  {
    message: "启用二次验证时，手机号和验证码为必填项",
    path: ["phone"],
  }
);

type ConditionalForm2 = z.infer<typeof formSchema2>;

export function DynamicValidationForm() {
  const { control, handleSubmit, watch } = useForm<ConditionalForm2>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      email: "",
      enable2FA: false,
      phone: "",
      verificationCode: "",
    },
  });

  const enable2FA = watch("enable2FA");

  const onSubmit: SubmitHandler<ConditionalForm2> = (data) => {
    console.log("提交的数据:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded">
      <h3 className="text-lg font-bold mb-4">动态验证规则示例</h3>

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <div>
            <label className="block mb-2">邮箱</label>
            <input {...field} type="email" className={inputClass} />
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="enable2FA"
        control={control}
        render={({ field }) => (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              className="w-4 h-4"
            />
            <label>启用二次验证</label>
          </div>
        )}
      />

      {/* 条件渲染：二次验证字段 */}
      {enable2FA && (
        <>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: enable2FA ? "手机号不能为空" : false,
              pattern: {
                value: /^1[3-9]\d{9}$/,
                message: "手机号格式不正确",
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block mb-2">手机号</label>
                <input {...field} type="tel" className={inputClass} placeholder="请输入手机号" />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="verificationCode"
            control={control}
            rules={{
              required: enable2FA ? "验证码不能为空" : false,
              minLength: {
                value: 6,
                message: "验证码为6位数字",
              },
            }}
            render={({ field, fieldState }) => (
              <div>
                <label className="block mb-2">验证码</label>
                <input {...field} type="text" className={inputClass} placeholder="请输入验证码" maxLength={6} />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </>
      )}

      <button type="submit" className={inputClass + " bg-blue-500 text-white"}>
        提交
      </button>
    </form>
  );
}

// ==================== 示例 3: 多层级条件表单 ====================
/**
 * 场景：物流订单表单
 * - 选择配送方式
 *   - 快递配送：选择快递公司 + 输入快递单号
 *   - 自提：选择自提点
 * - 如果选择快递配送的顺丰速运，还需要输入保价金额
 */
const formSchema3 = z.discriminatedUnion("deliveryMethod", [
  z.object({
    deliveryMethod: z.literal("express"),
    expressCompany: z.enum(["sf", "sto", "yt"]),
    trackingNumber: z.string().min(1, "快递单号不能为空"),
    insuredAmount: z.number().optional(),
  }),
  z.object({
    deliveryMethod: z.literal("pickup"),
    pickupLocation: z.string().min(1, "请选择自提点"),
  }),
]);

type ConditionalForm3 = z.infer<typeof formSchema3>;

export function NestedConditionalForm() {
  const { control, handleSubmit, watch } = useForm<ConditionalForm3>({
    resolver: zodResolver(formSchema3),
    defaultValues: {
      deliveryMethod: "express",
      expressCompany: "sf",
      trackingNumber: "",
      insuredAmount: 0,
    },
  });

  const deliveryMethod = watch("deliveryMethod");
  const expressCompany = watch("expressCompany");

  const onSubmit: SubmitHandler<ConditionalForm3> = (data) => {
    console.log("提交的数据:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded">
      <h3 className="text-lg font-bold mb-4">多层级条件表单示例</h3>

      <Controller
        name="deliveryMethod"
        control={control}
        render={({ field }) => (
          <div>
            <label className="block mb-2">配送方式</label>
            <select {...field} className={inputClass}>
              <option value="express">快递配送</option>
              <option value="pickup">自提</option>
            </select>
          </div>
        )}
      />

      {/* 快递配送 */}
      {deliveryMethod === "express" && (
        <>
          <Controller
            name="expressCompany"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="block mb-2">快递公司</label>
                <select {...field} className={inputClass}>
                  <option value="sf">顺丰速运</option>
                  <option value="sto">申通快递</option>
                  <option value="yt">圆通速递</option>
                </select>
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="trackingNumber"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="block mb-2">快递单号</label>
                <input {...field} className={inputClass} placeholder="请输入快递单号" />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          {/* 条件中的条件：只有顺丰速运才显示保价金额 */}
          {expressCompany === "sf" && (
            <Controller
              name="insuredAmount"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label className="block mb-2">保价金额（元）</label>
                  <input
                    {...field}
                    type="number"
                    className={inputClass}
                    value={field.value || 0}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  />
                  <p className="text-xs text-gray-500 mt-1">顺丰速运支持保价服务</p>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          )}
        </>
      )}

      {/* 自提 */}
      {deliveryMethod === "pickup" && (
        <Controller
          name="pickupLocation"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <label className="block mb-2">自提点</label>
              <select {...field} className={inputClass}>
                <option value="">请选择自提点</option>
                <option value="location1">朝阳区自提点A</option>
                <option value="location2">海淀区自提点B</option>
                <option value="location3">丰台区自提点C</option>
              </select>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
      )}

      <button type="submit" className={inputClass + " bg-blue-500 text-white"}>
        提交
      </button>

      {/* 实时显示当前选择 */}
      <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
        <p><strong>配送方式:</strong> {deliveryMethod === "express" ? "快递配送" : "自提"}</p>
        {deliveryMethod === "express" && (
          <>
            <p><strong>快递公司:</strong> {expressCompany === "sf" ? "顺丰速运" : expressCompany === "sto" ? "申通快递" : "圆通速递"}</p>
            {expressCompany === "sf" && <p className="text-green-600">✓ 支持保价服务</p>}
          </>
        )}
      </div>
    </form>
  );
}

// ==================== 示例 4: 使用自定义受控组件的条件表单 ====================

// 自定义受控组件
interface CustomInputProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function CustomInput({ label, error, children }: CustomInputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

// 自定义选择组件
interface CustomSelectProps {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
  value: string;
  onChange: (value: string) => void;
}

function CustomSelect({ label, options, error, value, onChange }: CustomSelectProps) {
  return (
    <CustomInput label={label} error={error}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </CustomInput>
  );
}

const formSchema4 = z.object({
  membershipLevel: z.enum(["free", "premium", "vip"]),
  subscriptionPeriod: z.string().optional(),
  features: z.array(z.string()).optional(),
});

type ConditionalForm4 = z.infer<typeof formSchema4>;

export function CustomComponentConditionalForm() {
  const { control, handleSubmit, watch } = useForm<ConditionalForm4>({
    resolver: zodResolver(formSchema4),
    defaultValues: {
      membershipLevel: "free",
      subscriptionPeriod: "monthly",
      features: [],
    },
  });

  const membershipLevel = watch("membershipLevel");

  const onSubmit: SubmitHandler<ConditionalForm4> = (data) => {
    console.log("提交的数据:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 border rounded">
      <h3 className="text-lg font-bold mb-4">自定义组件条件表单示例</h3>

      <Controller
        name="membershipLevel"
        control={control}
        render={({ field, fieldState }) => (
          <CustomSelect
            label="会员等级"
            options={[
              { value: "free", label: "免费会员" },
              { value: "premium", label: "高级会员" },
              { value: "vip", label: "VIP会员" },
            ]}
            error={fieldState.error?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />

      {/* 条件渲染：付费会员才显示订阅周期 */}
      {(membershipLevel === "premium" || membershipLevel === "vip") && (
        <Controller
          name="subscriptionPeriod"
          control={control}
          render={({ field, fieldState }) => (
            <CustomInput label="订阅周期" error={fieldState.error?.message}>
              <div className="flex gap-4">
                {["monthly", "quarterly", "yearly"].map((period) => (
                  <label key={period} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={field.name}
                      checked={field.value === period}
                      onChange={() => field.onChange(period)}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                    <span>
                      {period === "monthly" && "月付"}
                      {period === "quarterly" && "季付"}
                      {period === "yearly" && "年付"}
                    </span>
                  </label>
                ))}
              </div>
            </CustomInput>
          )}
        />
      )}

      {/* 条件渲染：VIP会员才显示额外功能选择 */}
      {membershipLevel === "vip" && (
        <Controller
          name="features"
          control={control}
          render={({ field }) => (
            <CustomInput label="额外功能" error="">
              <div className="space-y-2">
                {["优先客服", "专属顾问", "数据分析"].map((feature) => (
                  <label key={feature} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value?.includes(feature)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const newValue = checked
                          ? [...(field.value || []), feature]
                          : (field.value || []).filter((v) => v !== feature);
                        field.onChange(newValue);
                      }}
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </CustomInput>
          )}
        />
      )}

      <button type="submit" className={inputClass + " bg-blue-500 text-white"}>
        提交
      </button>
    </form>
  );
}

// ==================== 组合展示 ====================
export default function ConditionalFormExamples() {
  const [activeExample, setActiveExample] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">React Hook Form - Controller 条件表单示例</h1>

      {/* 选项卡 */}
      <div className="flex gap-2 border-b">
        {[
          { id: 1, label: "基础条件表单" },
          { id: 2, label: "动态验证" },
          { id: 3, label: "多层级条件" },
          { id: 4, label: "自定义组件" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveExample(tab.id as 1 | 2 | 3 | 4)}
            className={`px-4 py-2 ${
              activeExample === tab.id
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 示例内容 */}
      {activeExample === 1 && <BasicConditionalForm />}
      {activeExample === 2 && <DynamicValidationForm />}
      {activeExample === 3 && <NestedConditionalForm />}
      {activeExample === 4 && <CustomComponentConditionalForm />}

      {/* 说明文档 */}
      <div className="mt-6 p-4 bg-blue-50 rounded text-sm">
        <h3 className="font-bold mb-2">💡 Controller 条件表单的关键点：</h3>
        <ul className="space-y-1 list-disc list-inside">
          <li><strong>使用 watch 监听：</strong>通过 watch() 获取字段值，实现条件渲染</li>
          <li><strong>条件渲染：</strong>根据 watch 的值使用 && 运算符条件渲染 Controller</li>
          <li><strong>动态验证：</strong>使用 rules 或 refine 实现基于条件的验证</li>
          <li><strong>状态保持：</strong>隐藏的字段值会保留在表单状态中</li>
          <li><strong>shouldUnregister：</strong>如需在隐藏时清除值，可设置 shouldUnregister: true</li>
        </ul>
      </div>
    </div>
  );
}
