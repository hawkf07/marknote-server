import { pgTable, pgEnum, pgSchema, AnyPgColumn, serial, varchar, text, date, integer, boolean, unique } from "drizzle-orm/pg-core"


import { sql } from "drizzle-orm"

export const notes = pgTable("notes", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 256 }).notNull(),
	description: varchar("description", { length: 256 }).notNull(),
	body: text("body"),
	dateCreated: date("date_created").defaultNow(),
	dateUpdated: date("date_updated").defaultNow(),
	authorId: integer("author_id").notNull(),
});

export const todos = pgTable("todos", {
	id: serial("id").primaryKey().notNull(),
	title: varchar("title", { length: 256 }).notNull(),
	description: varchar("description", { length: 256 }).notNull(),
	dateCreated: date("date_created").defaultNow(),
	dateUpdated: date("date_updated").defaultNow(),
	completed: boolean("completed").default(false),
	authorId: integer("author_id").notNull(),
});

export const user = pgTable("user", {
	name: varchar("name", { length: 256 }).notNull(),
	id: serial("id").primaryKey().notNull(),
	email: varchar("email", { length: 256 }).notNull(),
	password: text("password").notNull(),
	dateCreated: date("date_created").defaultNow(),
},
(table) => {
	return {
		userEmailUnique: unique("user_email_unique").on(table.email),
	}
});