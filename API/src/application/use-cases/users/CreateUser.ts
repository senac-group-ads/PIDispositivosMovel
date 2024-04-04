import { hash } from "bcrypt";
import { Role, User } from "../../entities/users";
import { UserRepository } from "../../repositories/user/user-repository";
import { UserAlreadyExistsError } from "../erros/user-already-exists-error";
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

        const userAlreadyExist = await this.userRepository.findByEmail(email)

        if (userAlreadyExist) {
            throw new UserAlreadyExistsError()
        }

        const passwordHash = await hash(password, 6)

        const user = new User({
            name,
            email,
            password: passwordHash,
            cep,
            numero,
            contato,
            role,
            avata
        })

        await this.userRepository.creat(user)

        return { user }

    }
}