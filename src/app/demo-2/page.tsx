"use client";

/**
 * 使用 zod 来做校验
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().min(10, "Age must be at least 10"),
});

type Schema = z.infer<typeof schema>;

const Page = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // handle inputs
        console.log(data);
      })}
      className="flex flex-col gap-4"
    >
      <input
        {...register("name")}
        className="border border-gray-200 p-4 rounded"
        placeholder="name"
      />
      {errors.name?.message && <p className="text-rose-400">{errors.name?.message}</p>}
      <input
        {...register("age", { valueAsNumber: true })}
        type="number"
        placeholder="age"
        className="border border-gray-200 p-4 rounded"
      />
      {errors.age?.message && <p className="text-rose-400">{errors.age?.message}</p>}
      <input
        type="submit"
        className="flex-1 bg-pink-500 rounded p-4 text-white font-bold"
      />
    </form>
  );
};

export default Page;
