CREATE TABLE IF NOT EXISTS "notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"body" text,
	"date_created" date DEFAULT now(),
	"date_updated" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"date_created" date DEFAULT now(),
	"date_updated" date DEFAULT now(),
	"completed" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"name" varchar(256) NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" text NOT NULL,
	"date_created" date DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
