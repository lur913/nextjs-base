import { uuid, text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('createdAt').defaultNow(),
  updatedAt: timestamp('createdAt').defaultNow(),
});

export type User = typeof users.$inferSelect;
