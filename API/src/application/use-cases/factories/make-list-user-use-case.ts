import { DrizzleUserRepository } from "@/repository/table/UsersRepository";
import { ListUser } from "../users/ListUser";

export function makeListUserUseCase() {
    const repository = new DrizzleUserRepository()
    const listUser = new ListUser(repository)

    return listUser
}