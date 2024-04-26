import { DrizzlePetsRepository } from "@/repository/table/PetsRepository";
import { ListPets } from "../../pets/ListPets";

export function makeListPetsUseCase() {
    const repository = new DrizzlePetsRepository()
    const makeListPet = new ListPets(repository)

    return makeListPet
}