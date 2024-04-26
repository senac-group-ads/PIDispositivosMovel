import { DrizzleUserRepository } from "@/repository/table/UsersRepository";
import { ListUserForId } from "../../users/ListUserForId";

export function makeListUserForIdUseCase() {
    const repository = new DrizzleUserRepository()
    const listUserForId = new ListUserForId(repository)

    return listUserForId
}