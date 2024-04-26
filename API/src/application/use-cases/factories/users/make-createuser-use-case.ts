import { DrizzleUserRepository } from "@/repository/table/UsersRepository";
import { CreateUser } from "../../users/CreateUser";

export function makeCreateUserUseCase() {
    const repository = new DrizzleUserRepository()
    const createUser = new CreateUser(repository)

    return createUser
}