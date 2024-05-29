import { Pets } from "@/application/entities/pets";

export abstract class PetsRepository {
    abstract create( data: Pets ): Promise< Pets >
    abstract findById(id: string): Promise< Pets | null>
    abstract fndPetByUser(costumerId: string): Promise<Pets[] | null>
    abstract findByType(type: string): Promise< Pets[] | null>
    abstract find(pg: number): Promise< Pets[] | null>
    abstract adopted(id: string, adotado: boolean): Promise<void>
    abstract delet(id: string): Promise<void>
}