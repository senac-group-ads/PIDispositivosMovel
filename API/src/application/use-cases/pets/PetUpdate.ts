import { Pets } from "@/application/entities/pets";
import { PetsRepository } from "@/application/repositories/pets/pets-repository";
import { UnexistPet } from "../erros/unexistPet";

interface IPetUpdate {
    id: string,
    name?: string,
    idade?: string,
    tipo?: string,
    porte?: string,
    descricao?: string,
    peso?: string,
    requisitos?: string,
    fotos?: string
}

export class PetUpdate {
    constructor(private repository: PetsRepository) {}

    async execute({ id, descricao, fotos, idade, name, peso, porte, requisitos, tipo }: IPetUpdate) {
        try {
            const pets = await this.repository.findById(id)
            if (!pets) throw new UnexistPet()
                
            const data = new Pets({
                idade,
                name,
                tipo,
                fotos,
                porte,
                requisitos,
                peso,
                descricao
            })

            console.log(data)

            await this.repository.update(id, data)
        } catch (error) {
            throw new Error('error')
        }
    }
}