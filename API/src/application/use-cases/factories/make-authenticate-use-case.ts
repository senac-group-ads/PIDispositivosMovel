import { DrizzleUserRepository } from "@/repository/table/UsersRepository";
import { AutheticateUser } from "../users/authenticateUser";


export function makeAuthenticateUseCase() {
    const userRepository = new DrizzleUserRepository()
    const authenticateUseCase = new AutheticateUser(userRepository)

    return authenticateUseCase
}