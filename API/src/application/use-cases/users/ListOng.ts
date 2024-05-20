import { UserRepository } from "../../repositories/user/user-repository";
import { UnexistUser } from "../erros/unexistUser";
/*
* Caso de uso de listagem de usuario
*/

export class ListUserOng {
    constructor(private userRepository: UserRepository) {}

    async execute() {
        const user = await this.userRepository.findUserOng()

        if(!user) {
            throw new UnexistUser()
        }

        return { user }

    }
}