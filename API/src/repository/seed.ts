import { faker } from '@faker-js/faker'
import { pets, users } from './drizzle'
import { db } from "./connection"
import { createId } from '@paralleldrive/cuid2'

/**
 * Reset database
 */

async function seeded() {
    await db.delete(users)
    await db.delete(pets)

    console.log('✔️ Database reset!')

    /**
    * Create customers
    */
    await db.insert(users).values([
        {
            id: createId(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
        },
        {
            id: createId(),
            name: faker.person.fullName(),
            email: faker.internet.email(),
        }
    ])
    console.log('✔️ Created costumer!')

    /**
     * Create manager
     */

    const [ong] = await db.insert(users).values([
        {
            id: createId(),
            name: faker.person.fullName(),
            email: 'admin@admin.com',
            role: 'ong'
        }
    ]).returning({
        id: users.id
    })
    console.log('✔️ Created ong')

    /**
     * Create pet
     */

    await db.insert(pets).values([
        {
            name: 'toto',
            idade: '1 ano',
            costumerId: ong.id
        }
    ])

    console.log('✔️ Created restaurant!')
    console.log('Database seeded successfully!')

    process.exit()
}

seeded()