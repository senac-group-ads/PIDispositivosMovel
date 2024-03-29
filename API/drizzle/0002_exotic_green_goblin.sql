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
ALTER TABLE "users" DROP CONSTRAINT "users_age_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_costumer_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "cep" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "numble" numeric;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'costumer' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avata" text;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "age";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "weight";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "type";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "descriptions";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "poise";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "requirements";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "Pictures";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "costumer_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pets" ADD CONSTRAINT "pets_costumer_id_users_id_fk" FOREIGN KEY ("costumer_id") REFERENCES "users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");