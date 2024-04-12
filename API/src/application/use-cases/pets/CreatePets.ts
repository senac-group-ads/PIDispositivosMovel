import { Pets } from "../../entities/pets"
import { Role } from "../../entities/users"
import { PetsRepository } from "@/application/repositories/pets/pets-repository"
import { UserRepository } from "@/application/repositories/user/user-repository"
import { UnexistUser } from "../erros/unexistUser"
import { YouAreNotAOngError } from "../erros/YouAreNotAOngError"

interface IPetsRequest {
    name: string
    idade: string
    peso?: string | null
    tipo?: string | null
    descricao?: string | null
    porte?: string | null
    requisitos?: string | null
    fotos?: string[] | null
    adotado: boolean

    costumerId: string
}

interface IPetsResponse {
    pets: Pets
}

export class CreatePets {
    constructor( 
        private petsRepository: PetsRepository,
        private userRepository: UserRepository
        ){}

    async execut( data: IPetsRequest ): Promise<IPetsResponse> {
        const { name, idade, peso, tipo, descricao, porte, requisitos, fotos, adotado, costumerId } = data

        const userIsOng = await this.userRepository.findUserById(costumerId)

        if (!userIsOng) {
            throw new UnexistUser()
        }

        if (userIsOng.role != Role.ong) {
            throw new YouAreNotAOngError()
        }

        const pets = new Pets({
            name,
            idade,
            peso,
            tipo,
            descricao,
            adotado,
            fotos,
            porte,
            requisitos,
            costumerId,
        })

        await this.petsRepository.create(pets)

        return { pets }
    }
}