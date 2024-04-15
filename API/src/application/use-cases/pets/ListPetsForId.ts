import { PetsRepository } from "@/application/repositories/pets/pets-repository";
import { UnexistPet } from "../erros/unexistPet";

interface IPetsRequest {
    id: string
}

export class ListPetsForId {
    constructor(private petsRepository: PetsRepository) {}

    async execut({ id }: IPetsRequest) {
        const pet = this.petsRepository.findById(id)

        if(!pet) {
            throw new UnexistPet()
        }

        return pet
    }
}