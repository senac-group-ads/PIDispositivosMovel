import { DrizzleUserRepository } from "@/repository/table/UsersRepository";
import { PatchAvataPicture } from "../../users/PatchAvataPicture";

export function makePatchAvataPicture() {
    const repository = new DrizzleUserRepository()
    const makeAvataPicture = new PatchAvataPicture(repository)

    return makeAvataPicture
}