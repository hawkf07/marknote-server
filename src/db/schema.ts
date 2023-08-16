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
  integer,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  username: varchar("name", { length: 256 }).notNull(),
  id: serial("id").notNull().primaryKey(),
  email: varchar("email", { length: 256 }).unique().notNull(),
  password: text("password").notNull(),
  date_created: date("date_created").defaultNow(),
});

export const userRelations = relations(user, ({ many }) => {
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
  authorId:integer('author_id').notNull()
});

export const todosRelations = relations(todos, ({ one }) => ({
  author: one(user, {
    fields: [todos.authorId],
    references: [user.id],
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
  authorId:integer('author_id').notNull()
});

export const notesRelations = relations(notes, ({ one }) => ({
  author: one(user, {
    fields: [notes.authorId],
    references: [user.id],
  }),
}));
