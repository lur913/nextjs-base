"use server";

import { db } from "@/db/drizzle";
import { UserInsert, UserSelect, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  try {
    const res = await db.select().from(users);
    return { ok: true, data: res };
  } catch (error: any) {
    return { ok: false, error: error.message ?? "Unknown error" };
  }
}

export async function createUser(user: UserInsert) {
  try {
    await db.insert(users).values(user);
    revalidatePath('/')
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(
  id: string,
  user: Omit<UserSelect, "createdAt"| "updatedAt" | "password" | "id">
) {
  try {
    await db.update(users).set(user).where(eq(users.id, id));
    revalidatePath('/')
  } catch (error) {
    console.log(error);
  }
}

export async function deleteUser(id: string) {
  try {
    await db.delete(users).where(eq(users.id, id));
    revalidatePath('/')
  } catch (error) {
    console.log(error);
  }
}
