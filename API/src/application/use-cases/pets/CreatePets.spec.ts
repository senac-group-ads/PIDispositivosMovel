import { expect, describe, it, beforeEach } from 'vitest'

// import { DrizzlePetsRepository } from '../../../repository/table/PetsRepository'
// import { DrizzleUserRepository } from '../../../repository/table/UsersRepository'
import { CreatePets } from './CreatePets'
import { Role, User } from '../../entities/users'
import { Pets } from '../../entities/pets'
import { faker } from '@faker-js/faker'
import { InMemoryUserRepository } from '../../../repository/in-memory/UsersRepository'
import { InMemoryPetsRepository } from '../../../repository/in-memory/PetsRepository'
import { YouAreNotAOngError } from '../erros/YouAreNotAOngError'


let userRepository: InMemoryUserRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePets 

describe('Create a pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    userRepository = new InMemoryUserRepository()
    sut = new CreatePets(petsRepository, userRepository)
  })
  
  it('should be able create a pet', async () => { 
    const newUser = new User({
        name: 'Marcos',
        email: faker.internet.email(),
        cep: '26170330',
        numero: '4365',
        contato: '21 99999-9999',
        password: '123456',
        role: Role.ong,
        avata: ''
    }) 
    const userId = await userRepository.creat(newUser)
    const costumerId = userId.id

    const pet = new Pets({
        name: 'toto',
        idade: '1 ano',
        peso: '5kg',
        tipo: 'Cachorro',
        descricao: 'Um fofo doginho de 1 ano',
        adotado: false,
        porte: 'pequeno',
        costumerId,
    })

    const creat = await sut.execut(pet)

    expect(creat.pets.id).toEqual(expect.any(String))
  })

  it('should not be possible to raise a pet if it is not an ong', async () => { 
    const newUser = new User({
        name: 'Marcos',
        email: faker.internet.email(),
        cep: '26170330',
        numero: '4365',
        contato: '21 99999-9999',
        password: '123456',
        role: Role.costumer,
        avata: ''
    }) 
    const userId = await userRepository.creat(newUser)
    const costumerId = userId.id

    expect(() => sut.execut({
      name: 'toto',
      peso: '5kg',
      tipo: 'Cachorro',
      descricao: 'Um fofo doginho de 1 ano',
      petAdotado: false,
      porte: 'pequeno',
      costumerId,
      idade: '1 ano',
    })).rejects.toBeInstanceOf(YouAreNotAOngError)
  })
})