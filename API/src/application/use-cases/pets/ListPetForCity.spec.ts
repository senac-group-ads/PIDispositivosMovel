import { beforeEach, describe, expect, it } from "vitest"

import { DrizzlePetsRepository } from "@/repository/table/PetsRepository"

import { InMemoryPetsRepository } from "@/repository/in-memory/PetsRepository"
import { InMemoryUserRepository } from "@/repository/in-memory/UsersRepository"

import { ListPetsForCity } from "./ListPetsForCity"
import { faker } from "@faker-js/faker"
import { Role, User } from "@/application/entities/users"
import { Pets } from "@/application/entities/pets"

let petsRepository: InMemoryPetsRepository // usa um banco fake para testar a aplicação
let sut: ListPetsForCity // metodo de use-case
let userRepository: InMemoryUserRepository


describe('List pets', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    userRepository = new InMemoryUserRepository()
    sut = new ListPetsForCity(
        petsRepository,
    )
  })
  
  it('should be able list a user for id', async () => {
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

  const newPet2 = new Pets({
    name: 'toto',
    idade: '1 ano',
    peso: '5kg',
    tipo: 'Cachorro',
    descricao: 'Um fofo doginho de 1 ano',
    adotado: false,
    porte: 'pequeno',
    costumerId,
}) 

  await petsRepository.create(newPet) // Cria um novo pet no banco temporario
  await petsRepository.create(newPet2) // Cria um novo pet no banco temporario

    const listPet = await sut.execut()

    expect(listPet).toContainEqual(expect.objectContaining({ name: 'toto3' }));
  })
})