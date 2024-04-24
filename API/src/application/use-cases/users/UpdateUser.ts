import { User } from "../../entities/users";
import { UserRepository } from "../../repositories/user/user-repository";
import { hash } from "bcrypt";
import { UpdateUserError } from "../erros/UpdateUserError";
import { validPassword } from "@/lib/validPassword";
import { InvalidPassword } from "../erros/invalidPassword";

interface IUserUpdate {
    _id: string
    user: User
}

export class UpdateUser{
    constructor(private userRepository: UserRepository) {}

    async execute(data: IUserUpdate){
        const { user, _id } = data

        const id = _id

        let passwordHash: string | undefined

        if (user.password !== undefined) {

            const valid = await validPassword(user.password)
            if (!valid) {
                throw new InvalidPassword()
            }

            passwordHash = await hash(user.password, 6)
        }


        const userUpdate = new User({
            name: user.name,
            password: passwordHash,
            cep: user.cep,
            numero: user.numero,
            avata: user.avata,
            contato: user.contato,
            email: user.email,
            role: user.role
        })

        console.log(userUpdate.password)

        const updated = await this.userRepository.update(userUpdate, id)

        if (!updated) {
            throw new UpdateUserError()
        }

        return {
            updated: {
                ...updated,
                password: undefined,
                createdAt: undefined,
                updatedAt: undefined
            }
        }
    }
}