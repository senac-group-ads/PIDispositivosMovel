import { text, timestamp, pgTable, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { pets } from "./pets"

export const userRoleEnum = pgEnum('user_role', ['ong', 'costumer'])

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  cep: text("cep").notNull(),
  numero: text("numble").notNull(),
  contato: text("phone").notNull(),
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