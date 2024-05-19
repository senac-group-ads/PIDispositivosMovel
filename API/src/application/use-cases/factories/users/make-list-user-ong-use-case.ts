import { DrizzleUserRepository } from "@/repository/table/UsersRepository";
import { ListUserOng } from "../../users/ListOng";

export function makeListUserOngUseCase() {
    const repository = new DrizzleUserRepository()
    const listUserOng = new ListUserOng(repository)

    return listUserOng
}