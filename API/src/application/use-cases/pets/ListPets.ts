import { PetsRepository } from "@/application/repositories/pets/pets-repository"

export class ListPets{

    constructor(
        private petsRepository: PetsRepository,
    ) {}

    async execut(pg: number) {
        const pet = await this.petsRepository.find(pg)

        if(!pet) {
            throw new Error('Lista vazia')
        }

        return pet
    }
}