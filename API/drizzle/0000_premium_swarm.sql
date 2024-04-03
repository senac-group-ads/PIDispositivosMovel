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
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pets" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" text NOT NULL,
	"weight" text,
	"type" text,
	"descriptions" text,
	"poise" text,
	"requirements" text,
	"Pictures" text[],
	"costumer_id" text,
	"adopted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pets_age_unique" UNIQUE("age")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets" ADD CONSTRAINT "pets_costumer_id_users_id_fk" FOREIGN KEY ("costumer_id") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
