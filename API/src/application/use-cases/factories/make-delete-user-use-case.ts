import { DrizzleUserRepository } from "@/repository/table/UsersRepository";
import { DeleteUser } from "../users/DeleteUser";


export function makeDeleteUserUseCase() {
    const repository = new DrizzleUserRepository()
    const makeDeleteUser = new DeleteUser(repository)

    return makeDeleteUser
}