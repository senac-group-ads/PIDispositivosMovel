import { PetsRepository } from "@/application/repositories/pets/pets-repository";

interface adoptedRequest {
    adotado: boolean
    id: string
}

export class PetAdopted {
    constructor(private petRepository: PetsRepository) {}

    async execut({ adotado, id }: adoptedRequest){
        await this.petRepository.adopted(id, adotado)
    }
}