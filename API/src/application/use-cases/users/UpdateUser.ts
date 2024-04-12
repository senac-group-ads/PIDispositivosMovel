import { User } from "../../entities/users";
import { UserRepository } from "../../repositories/user/user-repository";
import { hash } from "bcrypt";
import { UpdateUserError } from "../erros/UpdateUserError";

interface IUserUpdate {
    _id: string
    user: User
}

export class UpdateUser{
    constructor(private userRepository: UserRepository) {}

    async execute(data: IUserUpdate){
        const { user, _id } = data

        const id = _id

        let passwordHash = ''

        if (user.password !== undefined) {
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

        const updated = await this.userRepository.update(userUpdate, id)

        if (!updated) {
            throw new UpdateUserError()
        }

        return updated
    }
}