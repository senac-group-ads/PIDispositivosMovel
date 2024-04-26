import { DrizzlePetsRepository } from "@/repository/table/PetsRepository";
import { DrizzleUserRepository } from "@/repository/table/UsersRepository";
import { CreatePets } from "../../pets/CreatePets";

export function makeCreatePetsUseCase() {
    const petRepository = new DrizzlePetsRepository()
    const userRepository = new DrizzleUserRepository()
    const makeCreatePet = new CreatePets(petRepository, userRepository)

    return makeCreatePet
}