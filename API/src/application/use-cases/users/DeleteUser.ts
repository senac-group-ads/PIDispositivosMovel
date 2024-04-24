import { UserRepository } from "@/application/repositories/user/user-repository";

interface IDeleteUserRequest {
    id: string
}

export class DeleteUser{
    constructor(private userRepository: UserRepository) {}

    async execute({ id }: IDeleteUserRequest) {
        await this.userRepository.delete(id)
    }
}