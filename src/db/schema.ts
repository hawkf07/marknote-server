import { relations } from "drizzle-orm";
import {
  PgSerial,
  PgText,
  PgVarchar,
  boolean,
  date,
  pgTable,
  serial,
  text,
  varchar,
  foreignKey,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  username: varchar("name", { length: 256 }).notNull(),
  id: serial("id").notNull().primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: text("password").notNull(),
  date_created: date("date_created").defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => {
  return {
    todos: many(todos),
    notes: many(notes),
  };
});

// plain text todos
export const todos = pgTable("todos", {
  id: serial("id").notNull().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  date_created: date("date_created").defaultNow(),
  date_updated: date("date_updated").defaultNow(),
  completed: boolean("completed").default(false),
});

export const todosRelations = relations(todos, ({ one }) => ({
  author: one(users, {
    fields: [todos.id],
    references: [users.id],
  }),
}));

// notes with markdown
export const notes = pgTable("notes", {
  id: serial("id").notNull().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  body: text("body"),
  date_created: date("date_created").defaultNow(),
  date_updated: date("date_updated").defaultNow(),
});

export const notesRelations = relations(notes, ({ one }) => ({
  author: one(users, {
    fields: [notes.id],
    references: [users.id],
  }),
}));
