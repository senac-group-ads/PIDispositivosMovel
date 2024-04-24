import { DrizzleUserRepository } from "@/repository/table/UsersRepository";
import { UpdateUser } from "../users/UpdateUser";

export function makeUpdateUseCase() {
    const repository = new DrizzleUserRepository()
    const makeUpdate = new UpdateUser(repository)

    return makeUpdate
}