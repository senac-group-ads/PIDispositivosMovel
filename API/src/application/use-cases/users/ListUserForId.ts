import { UserRepository } from "@/application/repositories/user/user-repository";
import { UnexistUser } from "../erros/unexistUser";

interface IUSerId {
    id: string
}

export class ListUserForId {
    constructor(private userRepository: UserRepository) {}

    async execute(data: IUSerId) {
        const { id } = data

        const user = await this.userRepository.findUserById(id)

        if(!user) {
            throw new UnexistUser()
        }

        return { 
            user: {
                ...user,
                password: undefined,
                createdAt: undefined,
                updatedAt: undefined
            }
        }

    }
}