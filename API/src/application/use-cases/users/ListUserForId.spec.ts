import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryUserRepository } from "@/repository/in-memory/UsersRepository"
import { Role, User } from "@/application/entities/users"
import { ListUserForId } from "./ListUserForId"
import { DrizzleUserRepository } from "@/repository/table/UsersRepository"
import { createId } from "@paralleldrive/cuid2"
import { UnexistUser } from "../erros/unexistUser"


let userRepository: InMemoryUserRepository // usa um banco fake para testar a aplicação
let sut: ListUserForId // metodo de use-case

describe('List user for id', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new ListUserForId(userRepository)
  })
  
  it('should be able list a user for id', async () => { // Testa a listagem de usuario apartir de um id.

    const newUser = new User({
        name: 'Marcos',
        email: 'marcos@marcos2.com',
        cep: '26170330',
        numero: '4365',
        contato: '21 99999-9999',
        password: '123456',
        role: Role.ong,
        avata: ''
    }) // Cria um novo usuario para ser testado

    const userId = await userRepository.creat(newUser)
    const id = userId.id

    const user = await sut.execute({id}) 
    
    expect(user).toEqual(expect.objectContaining({ name: 'Marcos' })); // testa se retorna um objeto com o usuario
  })

  it('should return an error if there are no users', async () => { // Testa se a listagem de usuario apartir de um id invalido retornara um erro.

    const id = createId()
    
    await expect(() => sut.execute({
      id
    })).rejects.toBeInstanceOf(UnexistUser) 
  })
})