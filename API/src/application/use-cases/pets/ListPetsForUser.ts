import { PetsRepository } from "@/application/repositories/pets/pets-repository";
import { UnexistPet } from "../erros/unexistPet";

interface IUerId {
    costumerId: string
}

export class ListPetsForUser {
    constructor(private repository:PetsRepository) {}

    async execute({ costumerId }: IUerId) {
        const pets = await this.repository.fndPetByUser(costumerId)

        if(!pets) return null;

        return pets
    }
}