// src/db/schema.ts
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
});

export const qcms_table = pgTable("qcms-table", {
	id: serial("id").primaryKey(),

	name: text("name").notNull(),
	title: text("title").notNull(),
});


