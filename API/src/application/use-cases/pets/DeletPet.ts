import { PetsRepository } from '../../repositories/pets/pets-repository'

interface IPetId {
    id: string
}

export class DeletPet {
    constructor(private petRepository: PetsRepository) {}

    async execute({ id }: IPetId) {
        try {
            await this.petRepository.delet(id)
        } catch (err) {
            return err
        }
    }
}