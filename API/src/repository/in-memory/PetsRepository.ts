import { Pets } from "../../application/entities/pets";
import { PetsRepository } from "../../application/repositories/pets/pets-repository";

export class InMemoryPetsRepository extends PetsRepository {
     
    public item: Pets[] = []

    async adopted(id: string, adotado: boolean): Promise<void> {
        const index = this.item.findIndex((itens) => itens.id === id)
        this.item[index].adotado = adotado
    }
 
    async find() {
        const pet = this.item.map((itens) => itens )

        if(!pet) {
            return null
        }

        return pet
    }

    async findById(id: string): Promise<Pets | null> {
        const pet = this.item.find((itens) => itens.id == id)

        if(!pet) {
            return null
        }

        return pet
    }

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