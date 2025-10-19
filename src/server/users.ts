"use server";

import { db } from "@/db/drizzle";
import { type User, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUsers() {
  try {
    const allUsers = await db.select().from(users);
    return allUsers;
  } catch (error) {
    console.log(error);
    throw error
  }
}

export async function createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const newUser = await db.insert(users).values(user);
    return newUser;
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to create user",
    };
  }
}

export async function updateUser(
  id: string,
  user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
) {
  try {
    const updateUser = await db
      .update(users)
      .set(user)
      .where(eq(users.id, id));
    return updateUser;
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to update user",
    };
  }
}

export async function deleteUser(id: string) {
  try {
    const deleteUser = await db.delete(users).where(eq(users.id, id));
    return deleteUser;
  } catch (error) {
    console.log(error);
    return {
      error: "Failed to delete user",
    };
  }
}
