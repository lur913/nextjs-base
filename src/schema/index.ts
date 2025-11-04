import * as z from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(3, "用户名至少3个字符")
    .max(20, "用户名最多20个字符"),
  email: z
    .string()
    .email("请输入正确的邮箱格式"),
});

export type User = z.infer<typeof userSchema>;
