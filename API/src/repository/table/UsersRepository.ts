import { eq } from "drizzle-orm";
import { User } from "../../application/entities/users";
import { UserRepository } from "../../application/repositories/user/user-repository";
import { db } from '../connection';
import { users } from "../drizzle";

/*
* Classe de banco de dados responsável por utilizar o drizzle para gerenciar as inserções no banco
*/

export class DrizzleUserRepository extends UserRepository{

    async findUserOng(): Promise<User[] | null> {
        const ong = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            avata: users.avata,
            cep: users.cep,
            numero: users.numero,
            contato: users.contato,
            role: users.role
        }).from(users).where(eq(users.role, 'ong'))

        return ong
    }
    async delete(id: string) {
        const [test] = await db.delete(users).where(eq(users.id, id)).returning()
    }
    async update(user: User, id: string): Promise<User> {

        const [update] = await db.update(users)
        .set({
            name: user.name,
            password: user.password,
            cep: user.cep,
            numero: user.numero,
            avata: user.avata,
            contato: user.contato,
            email: user.email,
            updatedAt: new Date()
        })
        .where(eq(users.id, id))
        .returning()

        return update
    }

    async findUserById(id: string): Promise<User | null> {
        const [user] = await db.select().from(users).where(eq(users.id, id))

        return user
    }

    async findUser(): Promise<User[] | null> {
        const user = await db.select({
            id: users.id,
            name: users.name,
            email: users.email,
            avata: users.avata,
            cep: users.cep,
            numero: users.numero,
            contato: users.contato,
            role: users.role
        }).from(users)

        if(user.length === 0) {
            return null
        }

        return user
    }
    async findByEmail(email: string): Promise<User> {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        
        return user
    }

    async creat(data: User): Promise<User> {
        const [user] = await db.insert(users).values([
            {
                id: data.id,
                name: data.name,
                email: data.email,
                password: data.password,
                cep: data.cep,
                numero: data.numero,
                avata: data.avata,
                contato: data.contato,
                role: data.role,
                createdAt: data.createdAt
            }
        ]).returning()
 
        return user
    }
}