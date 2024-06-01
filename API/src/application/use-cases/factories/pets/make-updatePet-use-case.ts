import { DrizzlePetsRepository } from "@/repository/table/PetsRepository";
import { PetUpdate } from "../../pets/PetUpdate";

export function makeUpdatePetUseCase() {
    const repository = new DrizzlePetsRepository()
    const makeUpdatePet = new PetUpdate(repository)

    return makeUpdatePet
}