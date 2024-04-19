import { PetsRepository } from "@/application/repositories/pets/pets-repository"

export class ListPetsForCity{

    constructor(
        private petsRepository: PetsRepository,
    ) {}

    async execut() {
        const pet = await this.petsRepository.find()

        if(!pet) {
            throw new Error('Lista vazia')
        }

        return pet
    }
}