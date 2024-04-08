import { User } from "../../entities/users";
import { UserRepository } from "../../repositories/user/user-repository";
/*
* Caso de uso de listagem de usuario
*/

interface IListUserResponse {
    user: User[]
}

export class ListUser {
    constructor(private userRepository: UserRepository) {}

    async execute(): Promise<IListUserResponse> {
        const user = await this.userRepository.findUser()

        if(!user) {
            throw new Error('Sem usuarios')
        }

        return {
            user,
        }

    }
}