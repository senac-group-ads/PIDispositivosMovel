import { Pets } from "@/application/entities/pets"
import { PetsRepository } from "@/application/repositories/pets/pets-repository"
import { UserRepository } from "@/application/repositories/user/user-repository"
import axios from "axios"
import { ListUserForId } from "../users/ListUserForId"

interface IPetsRequest {
    cityPet: string
}


export class ListPetsForCity{

    constructor(
        private petsRepository: PetsRepository,
        private userRepository: UserRepository
    ) {}

    async execut( { cityPet }: IPetsRequest ) {

        const listUser = new ListUserForId(this.userRepository)

        const pet = await this.petsRepository.find()

        if(!pet) {
            throw new Error('Lista vazia')
        }

        return pet
    }
}