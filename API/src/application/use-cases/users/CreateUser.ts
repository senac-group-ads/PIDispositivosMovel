import { User } from "../../entities/users";
import { UserRepository } from "../../repositories/user/user-repository";
/*
* Caso de uso de criação de usuario 
*/

interface ICreateUserRequest {
    data: User
}

export class CreateUser {
    constructor(private userRepository: UserRepository) {}

    async execute(request: ICreateUserRequest) {
        const { name, email, password, numero, cep, role, contato, avata} = request.data

        // TODO:  criar método de verificação de se o usuario ja existe no banco
        // TODO: Criar hash de senha para salvar no banco.

        const user = new User({
            name,
            email,
            password,
            cep,
            numero,
            contato,
            role,
            avata
        })

        await this.userRepository.creat(user)

        return {
            user
        }
    }
}