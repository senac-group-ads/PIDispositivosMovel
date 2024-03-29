import { text, timestamp, pgTable, boolean,} from "drizzle-orm/pg-core";
import { createId } from '@paralleldrive/cuid2'
import {users} from './users'
import { relations } from "drizzle-orm";

export const pets = pgTable("pets", {
  id: text("id").$defaultFn(() => createId()).primaryKey(),
  name: text("name").notNull(),
  idade: text("age").notNull().unique(),
  peso: text("weight"),
  tipo: text("type"),
  descricao: text("descriptions"),
  porte: text("poise"),
  requisitos: text("requirements"),
  fotos: text("Pictures").array(),
  costumerId: text("costumer_id").references(() => users.id, {
    onDelete: "set null"
  }),
  adotado: boolean("adopted").default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export  const petsRelation = relations(pets, ({ one }) => {
    return {
        ongs: one(users, {
            fields: [pets.costumerId],
            references: [users.id],
            relationName: 'pets_ong'
        })
    }
})