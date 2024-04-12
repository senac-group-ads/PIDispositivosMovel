import { Pets } from "../../application/entities/pets";
import { PetsRepository } from "../../application/repositories/pets/pets-repository";

export class InMemoryPetsRepository extends PetsRepository {
    
    public item: Pets[] = []

    async create(data: Pets): Promise<Pets> {
        const pet = new Pets({
            name: data.name,
            idade: data.idade,
            peso: data.peso,
            fotos: data.fotos,
            porte: data.porte,
            tipo: data.tipo,
            requisitos: data.requisitos,
            descricao: data.descricao,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            adotado: data.adotado,

            costumerId: data.costumerId
        })

        this.item.push(pet)

        return pet
    }

}