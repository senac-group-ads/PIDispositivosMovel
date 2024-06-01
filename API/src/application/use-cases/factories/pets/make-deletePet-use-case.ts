import { DrizzlePetsRepository } from "@/repository/table/PetsRepository";
import { DeletPet } from "../../pets/DeletPet";

export function makeDeletPetsUseCase() {
    const petRepository = new DrizzlePetsRepository()
    const makeDeletPet = new DeletPet(petRepository)

    return makeDeletPet
}