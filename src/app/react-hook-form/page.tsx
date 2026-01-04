'use client'

import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Schema = {
  name: string
  count: number
};

export default function Page() {
  const form = useForm<Schema>({
    defaultValues: {
      name: "",
      count: 5
    },
  });

  const onSubmit = (data: Schema) => {
    console.log(123, data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="name"
        control={form.control}
        render={({ field }) => (
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input {...field}/>
          </Field>
        )}
      ></Controller>

      <Controller
        name="count"
        control={form.control}
        render={({field}) => (
          <Field>
            <FieldLabel>Count</FieldLabel>
            <Increment {...field}/>
          </Field>
        )}
      />
      
      <Field>
        <Button>Submit</Button>
      </Field>
    </form>
  );
}

type IncrementProps = {
  value: number
  onChange: (value: number) => void
}

/***
 * 大概是明白了自定义的受控组件
 */
// 自定义组件
function Increment({ value, onChange }: IncrementProps) {
  const handleIncrement = () => {
    onChange(value + 1)
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" type="button" onClick={handleIncrement}>
        Increment
        <Plus/>
      </Button>
      <div>{value}</div>
    </div>
  )
}
