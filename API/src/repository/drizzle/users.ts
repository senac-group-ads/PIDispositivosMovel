import { text, timestamp, pgTable, numeric, pgEnum, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { pets } from "./pets"

export const userRoleEnum = pgEnum('user_role', ['ong', 'costumer'])

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password"),
  cep: text("cep"),
  numero: text("numble"),
  contato: text("phone"),
  role: userRoleEnum('role').default('costumer').notNull(),
  avata: text("avata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export  const userRelation = relations(users, ({ many }) => {
  return {
      ongs: many(pets, {
        relationName: "ong_pets"
      })
  }
})