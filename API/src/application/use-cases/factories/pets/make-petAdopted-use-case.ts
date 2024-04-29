import { DrizzlePetsRepository } from "@/repository/table/PetsRepository";
import { PetAdopted } from "../../pets/PetAdopted";


export function makePetAdoptedUseCase() {
    const repository = new DrizzlePetsRepository()
    const makePetAdopted = new PetAdopted(repository)

    return makePetAdopted
}