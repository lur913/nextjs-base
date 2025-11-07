"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { createUser, updateUser } from "@/server/user";
import { useRouter } from "next/navigation";
import { UserSelect } from "@/db/schema";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  username: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  email: z.email("Please enter a valid email address."),
});

export function UserAddForm(
  {
    children,
    record
  } : {
    children: React.ReactNode;
    record?: UserSelect
  }
) {
  const [isPending, startTransition] = React.useTransition();
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username:"",
      email: "",
    },
  });

  // 根据 record 来反显表格
  React.useEffect(() => {
    form.reset({
      username: record?.username || "",
      email: record?.email || "",
    })
  }, [record]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    const users = {
      ...data,
      password: "password123",
    };
    startTransition(async () => {
      try {
        console.log(111, record);
        record ? 
        await updateUser(record.id, data) :
        await createUser(users);

        record ?
        toast.success("User updated successfully") :
        toast.success("User created successfully");
        form.reset();
        router.refresh();
        setIsOpen(false);
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>User Name</FieldLabel>
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
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="tom@example.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Field orientation="horizontal" className="flex justify-end pt-6">
            <DialogClose asChild>
              <Button variant="outline" onClick={() => form.reset()}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner /> : "Create"}
            </Button>
          </Field>
        </form>
      </DialogContent>
    </Dialog>
  );
}
