'use client'

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};


export default function BaseForm() {

    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(`submit:`, data);

  console.log(`watch: `, watch("example"));
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label>
          <span className="font-bold">Test: </span>
          <input
            className="border rounded p-1 focus-visible:ring-1 focus-visible:ring-purple-400/50"
            defaultValue="test"
            {...register("example")}
          />
        </label>

        <label>
          <span className="font-bold">Test Required: </span>
          <input
            {...register("exampleRequired", { required: '这个字段必填！！！' })}
            className="border rounded p-1 focus-visible:ring-1 focus-visible:ring-purple-400/50"
          />
        </label>
        {errors.exampleRequired && (
          <span className="text-rose-600 text-sm">{errors.exampleRequired.message}</span>
        )}

        <input
          type="submit"
          className="bg-blue-500 rounded py-2 px-4 text-white"
        />
      </form>
  )
}