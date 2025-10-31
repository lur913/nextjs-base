"use client";

import { useForm } from 'react-hook-form'

let count = 0
export default function Page() {

  const {register, handleSubmit, watch, formState: { errors }} = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  })
  console.log(`errors: `, errors);
  count++
  console.log(watch('firstName'));

  return (
    <div>
      <h1>demo 1 -  {count}</h1>
      <form onSubmit={handleSubmit((data) => {
        console.log(111, data);
      })} className="flex flex-col gap-4 pt-4">
        <input type="text" {...register("firstName", {required: '这个字段必填！！！', pattern: {
          value: /^[A-Za-z]+$/i,
          message: '只能包含字母'
        } })} placeholder="First Name" className="border border-gray-200 p-4 rounded"/>
        <p className='text-red-600 text-sm'>{errors.firstName?.message}</p>
        <input type="text" {...register("lastName", {required: '这个字段必填！！！', minLength: {
          value: 4,
          message: '最少4个字符'
        }})} placeholder="Last Name" className="border border-gray-200 p-4 rounded"/>
        <p className='text-red-600 text-sm'>{errors.lastName?.message}</p>
        <div className="flex gap-4">
          <button type="reset" className="flex-1 border border-gray-200 rounded p-4 text-black font-bold">Reset</button>
          <button type="submit" className="flex-1 bg-pink-500 rounded p-4 text-white font-bold">Submit</button>
        </div>
      </form>
    </div>
  );
}
