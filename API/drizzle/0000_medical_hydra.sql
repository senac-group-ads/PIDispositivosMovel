DO $$ BEGIN
 CREATE TYPE "user_role" AS ENUM('ong', 'costumer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text,
	"cep" text,
	"numble" numeric,
	"phone" text,
	"role" "user_role" DEFAULT 'costumer' NOT NULL,
	"avata" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
