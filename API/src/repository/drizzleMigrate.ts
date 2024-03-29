import postgres from "postgres";

import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import { env } from "../lib/env";

const conect = postgres(env.DATABASE_URL, {max: 1})
const db = drizzle(conect)

async function exec() {
    await migrate(db, {migrationsFolder: 'drizzle'})
    
    await conect.end()
    
    process.exit()
}

exec()