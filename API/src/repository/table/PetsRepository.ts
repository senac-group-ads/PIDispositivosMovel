import { Pets } from "@/application/entities/pets";
import { PetsRepository } from "../../application/repositories/pets/pets-repository";
import { db } from "../connection";
import { pets } from "../drizzle";
import { eq } from "drizzle-orm";

export class DrizzlePetsRepository extends PetsRepository {
    async delet(id: string): Promise<void> {
        await db.delete(pets).where(eq(pets.id, id))
    }

    async fndPetByUser(costumerId: string): Promise<Pets[] | null> {
        const data = await db.select({
            id: pets.id,
            name: pets.name,
            idade: pets.idade,
            peso: pets.peso,
            porte: pets.porte,
            tipo: pets.tipo,
            descricao: pets.descricao,
            requisitos: pets.requisitos,
            fotos: pets.fotos,
            userId: pets.costumerId,
            adotado: pets.adotado
        }).from(pets).where(eq(pets.costumerId, costumerId));

        return data
    }
    
    async findByType(type: string): Promise<Pets[] | null> {
        const typePet = await db.select({
            id: pets.id,
            name: pets.name,
            idade: pets.idade,
            peso: pets.peso,
            porte: pets.porte,
            tipo: pets.tipo,
            descricao: pets.descricao,
            requisitos: pets.requisitos,
            fotos: pets.fotos,
            userId: pets.costumerId,
        }).from(pets).where(eq(pets.tipo, type))

        return typePet
    }

    async adopted(id: string, adotado: boolean): Promise<void> {
        await db.update(pets).set({
            adotado
        }).where(eq(pets.id, id))
    }

    async find(pg: number): Promise< Pets[] | null > {
        const data = await db.select({
            id: pets.id,
            name: pets.name,
            idade: pets.idade,
            peso: pets.peso,
            porte: pets.porte,
            tipo: pets.tipo,
            descricao: pets.descricao,
            requisitos: pets.requisitos,
            fotos: pets.fotos,
            userId: pets.costumerId,
            adotado: pets.adotado
        }).from(pets).where(eq(pets.adotado, false)).limit(10).offset((pg - 1) * 10)

        if(data.length === 0 ) {
            return null
        }

        return data
    }

    async findById(id: string): Promise<Pets | null> {
        const [pet] = await db.select().from(pets).where(eq(pets.id, id))

        return pet
    }

    async create(data: Pets): Promise<Pets> {
        const [creatd] = await db.insert(pets).values([{
            id: data.id,
            name: data.name,
            idade: data.idade,
            peso: data.peso,
            adotado: data.adotado,
            tipo: data.tipo,
            porte: data.porte,
            requisitos: data.requisitos,
            descricao: data.descricao,
            fotos: data.fotos,
            createdAt: data.createdAt,
            
            costumerId: data.costumerId
        }]).returning()

        return creatd
    }
}