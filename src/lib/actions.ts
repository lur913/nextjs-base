"use server";

import { sleep } from "./utils";

export async function handleSubmit(formData: FormData) {
  await sleep(2000);
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  console.log(`file-submit: `, { name, password });
}

export type FormState =
  | {
      errors?: {
        name?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export async function handleLogin(preSate: FormState,formData: FormData) {
  await sleep(2000);
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;

  console.log(`file-submit: `, { name, password });
  
  const res:FormState = {}
  if(!name) {
    // return {errors: {name: ["Name is required"]}}
    res.errors = {}
    res.errors.name = ["Name is required"]
  }

  if(!password) {
    if(!res.errors) res.errors = {}
    res.errors.password = ["Password is required"]
  }

  if(!name || !password) {
    return res
  }else {
    return {message: "Login success"}
  }

}
