'use server'

import { db } from '@/db/drizzle';
import { UserInsert, UserSelect, users } from '@/db/schema'

export async function getUsers() {
  try {
    const res =  await db.select().from(users)
    return {ok: true, data: res}
  } catch (error: any) {
    return {ok: false, error: error.message ?? 'Unknown error'}
  }
}

export async function createUser(user: UserInsert) {
  try {
    await db.insert(users).values(user)
  }catch (error) {
    console.log(error);
  }
}