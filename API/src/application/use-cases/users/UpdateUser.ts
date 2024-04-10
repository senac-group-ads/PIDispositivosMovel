import { User } from "@/application/entities/users";
import { UserRepository } from "@/application/repositories/user/user-repository";
import { hash } from "bcrypt";

interface IUserUpdate {
    user: User
}

export class UpdateUser{
    constructor(private userRepository: UserRepository) {}

    async execute(data: IUserUpdate){
        const { user } = data

        const passwordHash = await hash(user.password, 6)

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

        const updated = this.userRepository.update(userUpdate)

        return updated
    }
}