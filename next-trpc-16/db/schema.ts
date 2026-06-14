import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const feedback = pgTable("feedback", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  comment: varchar({ length: 1000 }).notNull(),
});
