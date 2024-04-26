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
    petAdotado?: boolean | null

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
        const { name, idade, peso, tipo, descricao, porte, requisitos, fotos, petAdotado, costumerId } = data
        let adotado: boolean;

        const userIsOng = await this.userRepository.findUserById(costumerId)

        if (!userIsOng) {
            throw new UnexistUser()
        }
        if (userIsOng.role != Role.ong) {
            throw new YouAreNotAOngError()
        }


        if (!petAdotado) {
            adotado = false
        } else {
            adotado = petAdotado
        }

        const create = new Pets({
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

        const pets = await this.petsRepository.create(create)

        return { pets }
    }
}