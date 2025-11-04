/**
 * 测试 react-hook-form + server actions
 * 最终测试，只能使用 useTransition 来在
 * onSubmit 中使用 server actions 
 * 这种方式还是比较丝滑
 */

"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { userSchema, User } from "@/schema/index";
import { addUser } from "@/actions/index";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function Page() {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const [pending, startTransition] = React.useTransition();

  function onSubmit(data: User) {
    // toast("您提交了以下内容：", {
    //   description: (
    //     <pre className=" mt-2 w-[320px] overflow-x-auto rounded-md p-4">
    //       <code>{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    //   position: "bottom-right",
    //   classNames: {
    //     content: "flex flex-col gap-2",
    //   },
    //   style: {
    //     "--border-radius": "calc(var(--radius)  + 4px)",
    //   } as React.CSSProperties,
    // });
    startTransition(async () => {
      const res = await addUser(data)
      if (res.success) {
        toast.success("添加成功！")
        form.reset()
      }else {
        toast.error("添加失败！")
      }
    })
  }
  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>新增用户</CardTitle>
        <CardDescription>为系统添加新用户</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>用户名称</FieldLabel>
                  <FieldDescription>仅支持商城系统用户</FieldDescription>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Tom Smith"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>用户邮箱</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Smith@tom.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            重置
          </Button>
          <Button type="submit" disabled={pending} form="form-rhf-demo">
            {pending ? <Spinner /> : "提交"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
