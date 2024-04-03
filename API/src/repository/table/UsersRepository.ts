import { User } from "../../application/entities/users";
import { UserRepository } from "../../application/repositories/user/user-repository";
import { db } from '../connection';
import { users } from "../drizzle";

/*
* Classe de banco de dados responsável por utilizar o drizzle para gerenciar as inserções no banco
*/

export class DrizzleUserRepository extends UserRepository{
    async creat(user: User): Promise<User> {
        const [created] = await db.insert(users).values([
            {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                cep: user.cep,
                numero: user.numero,
                avata: user.avata,
                contato: user.contato,
                role: user.role,
                createdAt: user.created
            }
        ]).returning()

        return created
    }
}