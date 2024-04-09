import { User } from "../../entities/users";
import { UserRepository } from "../../repositories/user/user-repository";
/*
* Caso de uso de listagem de usuario
*/

export class ListUser {
    constructor(private userRepository: UserRepository) {}

    async execute() {
        const user = await this.userRepository.findUser()

        if(!user) {
            throw new Error('Sem usuarios')
        }

        return user

    }
}