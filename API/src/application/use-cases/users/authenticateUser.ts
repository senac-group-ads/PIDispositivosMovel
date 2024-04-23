import { UserRepository } from "@/application/repositories/user/user-repository"
import { compare } from "bcrypt"
import { UnexistUser } from "../erros/unexistUser"
import { IncorrectUserPassword } from "../erros/incorrectPassword"

interface IAuthentication {
    email: string
    password: string
}

export class AutheticateUser {
    constructor(private userRepositori: UserRepository) {}

    async execute(date: IAuthentication) {
        const { email, password } = date

        const user = await this.userRepositori.findByEmail(email)

        if (!user) {
            throw new UnexistUser()
        }

        console.log(user)

        const comparete = await compare(password, user.password)

        if (!comparete) {
            throw new IncorrectUserPassword()
        }
 
        return user
    }
}