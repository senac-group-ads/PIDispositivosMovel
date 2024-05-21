import { PetsRepository } from "@/application/repositories/pets/pets-repository";
import { UnexistPet } from "../erros/unexistPet";

interface IPetsRequest {
    type: string
}

export class ListPetsForType {
    constructor(private petsRepository: PetsRepository) {}

    async execut({ type }: IPetsRequest) {
        const pet = await this.petsRepository.findByType(type)

        if(!pet) {
            throw new UnexistPet()
        }

        return pet
    }
}