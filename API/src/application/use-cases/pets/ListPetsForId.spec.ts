import { beforeEach, describe, expect, it } from "vitest"

import { DrizzleUserRepository } from "@/repository/table/UsersRepository"
import { ListPetsForId } from "./ListPetsForId"
import { InMemoryPetsRepository } from "@/repository/in-memory/PetsRepository"
import { Pets } from "@/application/entities/pets"
import { Role, User } from "@/application/entities/users"
import { faker } from "@faker-js/faker"
import { InMemoryUserRepository } from "@/repository/in-memory/UsersRepository"
import { createId } from "@paralleldrive/cuid2"
import { UnexistPet } from "../erros/unexistPet"

let userRepository: InMemoryUserRepository


let petsRepository: InMemoryPetsRepository // usa um banco fake para testar a aplicação
let sut: ListPetsForId // metodo de use-case

describe('List user for id', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    userRepository = new InMemoryUserRepository()
    sut = new ListPetsForId(petsRepository)
  })
  
  it('should be able list a user for id', async () => { // Testa a listagem de pet apartir de um id.

    const newUser = new User({
        name: 'Marcos',
        email: faker.internet.email(),
        cep: '26170330',
        numero: '4365',
        contato: '21 99999-9999',
        password: '123456',
        role: Role.ong,
        avata: ''
    }) // Cria um novo usuario no banco temporario
    const userId = await userRepository.creat(newUser)
    const costumerId = userId.id // seleciona o id para poder criar um pet

    const newPet = new Pets({
        name: 'toto',
        idade: '1 ano',
        peso: '5kg',
        tipo: 'Cachorro',
        descricao: 'Um fofo doginho de 1 ano',
        adotado: false,
        porte: 'pequeno',
        costumerId,
    }) 

    const pet = await petsRepository.create(newPet) // Cria um novo pet no banco temporario

    const id = pet.id // seleciona o id

    const listPet = await sut.execut({id})

    expect(listPet).toEqual(expect.objectContaining({ name: 'toto' })); // checa se o id vai listar o usuario criado
  })

  it('should return an error if there are no users', async () => { // Testa se a listagem de pet apartir de um id invalido retonarar um erro. 

    const id = createId()
    
    await expect(() => sut.execut({
      id
    })).rejects.toBeInstanceOf(UnexistPet) 
  })
})