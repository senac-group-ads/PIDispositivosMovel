import { Pets } from "@/application/entities/pets";

export abstract class PetsRepository {
    abstract create( data: Pets ): Promise< Pets >
    abstract findById(id: string): Promise< Pets | null>
}