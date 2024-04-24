import { hash } from "bcrypt";

import { Role, User } from "../../entities/users";
import { UserRepository } from "../../repositories/user/user-repository";
import { validPassword } from "@/lib/validPassword";

import { UserAlreadyExistsError } from "../erros/user-already-exists-error";
import { InvalidPassword } from "../erros/invalidPassword";
/*
* Caso de uso de criação de usuario 
*/

interface ICreateUserRequest {
    name: string, 
    email: string, 
    password: string, 
    numero: string, 
    cep: string, 
    role: Role, 
    contato: string, 
    avata: string | null
}

interface ICreateUserResponse {
    user: User
}

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(request: ICreateUserRequest): Promise<ICreateUserResponse> {
        const { name, email, password, numero, cep, role, contato, avata} = request

        const userAlreadyExist = await this.userRepository.findByEmail(email) // Verifica se o usuario já existe no banco

        const valid = await validPassword(password)

        if(!valid) {
            throw new InvalidPassword()
        }

        if (userAlreadyExist) {
            throw new UserAlreadyExistsError() // Retorna um erro se o usuario ja existir
        }

        const passwordHash = await hash(password, 6) // Faz hash da senha

        const create = new User({
            name,
            email,
            password: passwordHash,
            cep,
            numero,
            contato,
            role,
            avata
        })

        const user = await this.userRepository.creat(create) // Cria o usario

        return { 
            user,
        }

    }
}