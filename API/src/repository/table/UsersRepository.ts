import { IUSer, User } from "../../application/entities/users";
import { UserRepository } from "../../application/repositories/user/user-repository";
import { db } from '../connection';
import { users } from "../drizzle";

/*
* Classe de banco de dados responsável por utilizar o drizzle para gerenciar as inserções no banco
*/


export class DrizzleUserRepository extends UserRepository{
    async creat(data: User): Promise<IUSer> {
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