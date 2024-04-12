import { beforeEach, describe, expect, it } from "vitest"

import { InMemoryUserRepository } from "@/repository/in-memory/UsersRepository"
import { Role, User } from "../../entities/users"
import { DrizzleUserRepository } from "@/repository/table/UsersRepository"
import { UpdateUser } from "./UpdateUser"
import { faker } from "@faker-js/faker"


let userRepository: InMemoryUserRepository // usa um banco fake para testar a aplicação
let sut: UpdateUser // metodo de use-case

describe('Update user', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new UpdateUser(userRepository)
  })
  
  it('should be able updated a user', async () => {

    const newUser = new User({
        name: 'Felipe',
        email: faker.internet.email(),
        cep: '26170330',
        numero: '4365',
        contato: '21 99999-9999',
        password: '123456',
        role: Role.ong,
        avata: ''
    }) // Cria um novo usuario para ser testado

    const update = {
        name: "Marcos",
        cep: "2104360"
    }

    const userId = await userRepository.creat(newUser)
    const id = userId.id

    const user = await sut.execute({
        _id: id,
        user: update
    })
    
    expect(user).toEqual(expect.objectContaining({ name: 'Marcos' })); // testa se retorna um objeto com o usuario
  })
})