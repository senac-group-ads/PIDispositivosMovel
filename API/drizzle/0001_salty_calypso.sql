ALTER TABLE "users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "age" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "weight" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "type" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "descriptions" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "poise" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "requirements" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "Pictures" text[];--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "costumer_id" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_costumer_id_users_id_fk" FOREIGN KEY ("costumer_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "password";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "cep";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "numble";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "phone";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "role";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "avata";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_age_unique" UNIQUE("age");