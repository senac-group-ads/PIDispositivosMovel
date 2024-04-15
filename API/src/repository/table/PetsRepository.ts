import { Pets } from "@/application/entities/pets";
import { PetsRepository } from "../../application/repositories/pets/pets-repository";
import { db } from "../connection";
import { pets } from "../drizzle";
import { eq } from "drizzle-orm";

export class DrizzlePetsRepository extends PetsRepository {
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