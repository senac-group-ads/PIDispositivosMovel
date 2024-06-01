import { ListPetsForUser } from "../../pets/ListPetsForUser";
import { DrizzlePetsRepository } from "@/repository/table/PetsRepository";

export function makeListPetForUserUseCase(){
    const repositorie = new DrizzlePetsRepository()
    const makeListPetForUser = new ListPetsForUser(repositorie)
    
    return makeListPetForUser
}