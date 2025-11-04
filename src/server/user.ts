'use server'

import { db } from '@/db/drizzle';
import { UserInsert, UserSelect, users } from '@/db/schema'

export async function getUsers() {
  try {
    return await db.select().from(users)
  } catch (error) {
    return error
  }
}