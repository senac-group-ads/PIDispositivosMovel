import { UserRepository } from "@/application/repositories/user/user-repository";
import { UnexistUser } from "../erros/unexistUser";

type IPatchAvataRequest = {
    id: string
    avata: string
}

export class PatchAvataPicture {
    constructor(private userRepository: UserRepository) {}

    async execut({ avata, id}: IPatchAvataRequest) {
        const user = await this.userRepository.findUserById(id)

        if(!user) {
            throw new UnexistUser()
        }

        const response = await this.userRepository.PetchAvataPicture(id, avata)

        return {
            response: {
                ...response,
                password: undefined,
                createdAt: undefined,
                updatedAt: undefined
            }
        }
    }
}