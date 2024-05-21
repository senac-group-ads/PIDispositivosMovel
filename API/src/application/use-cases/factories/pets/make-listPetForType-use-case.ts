import { DrizzlePetsRepository } from "@/repository/table/PetsRepository"
import { ListPetsForType } from "../../pets/ListPetsForType"


export function makeListPetForType() {
    const repository = new DrizzlePetsRepository()
    const makeListPetForType = new ListPetsForType(repository)

    return makeListPetForType
}