// src/schema/users.ts
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id:        uuid('id').primaryKey().defaultRandom(),
  email:     text('email').notNull().unique(),
  username:  text('username').notNull().unique(),
  password:  text('password').notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(), // ① 默认值
});

export type UserInsert = typeof users.$inferInsert
export type UserSelect = typeof users.$inferSelect
