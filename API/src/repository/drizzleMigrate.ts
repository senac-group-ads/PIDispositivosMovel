import postgres from "postgres";

import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"

const conect = postgres('postgresql://postgres:abc.123@localhost:3339/find-a-friend', {max: 1})
const db = drizzle(conect)

async function exec() {
    await migrate(db, {migrationsFolder: 'drizzle'})
    
    await conect.end()
    
    process.exit()
}

exec()