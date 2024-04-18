import { beforeEach, describe, expect, it } from "vitest"

import { DrizzleUserRepository } from "@/repository/table/UsersRepository"
import { DrizzlePetsRepository } from "@/repository/table/PetsRepository"

import { InMemoryUserRepository } from "@/repository/in-memory/UsersRepository"
import { InMemoryPetsRepository } from "@/repository/in-memory/PetsRepository"

import { ListPetsForCity } from "./ListPetsForCity"

let userRepository: DrizzleUserRepository
let petsRepository: DrizzlePetsRepository // usa um banco fake para testar a aplicação
let sut: ListPetsForCity // metodo de use-case

describe('List user for id', () => {
  beforeEach(() => {
    petsRepository = new DrizzlePetsRepository()
    userRepository = new DrizzleUserRepository()
    sut = new ListPetsForCity(
        petsRepository,
        userRepository
    )
  })
  
  it('should be able list a user for id', async () => {

    const listPet = await sut.execut( { cityPet: '26170330' } )

    expect(listPet).toEqual(expect.objectContaining({ name: 'toto' }));
  })
})