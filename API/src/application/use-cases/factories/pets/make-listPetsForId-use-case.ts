import { DrizzlePetsRepository } from "@/repository/table/PetsRepository";
import { ListPetsForId } from "../../pets/ListPetsForId";


export function makeListPetForIdUseCase() {
    const repository = new DrizzlePetsRepository()
    const makeListPetForId = new ListPetsForId(repository)

    return makeListPetForId
 }