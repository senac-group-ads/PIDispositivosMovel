import { InMemoryUserRepository } from "@/repository/in-memory/UsersRepository"
import { ListUser } from "./ListUser"
import { beforeEach, describe, expect, it, suite } from "vitest"
import { Role, User } from "@/application/entities/users"
// import { DrizzleUserRepository } from "@/repository/table/UsersRepository"


let userRepository: InMemoryUserRepository // usa um banco fake para testar a aplicação
let sut: ListUser // metodo de use-case

describe('List user Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new ListUser(userRepository)
  })
  
  it('should be able list a user', async () => { // Testa a listagem de usuario apartir do caso de uso.

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

    const newUser2 = new User({
      name: 'Marcos',
      email: 'marcos@marcos.com',
      cep: '26170330',
      numero: '4365',
      contato: '21 99999-9999',
      password: '123456',
      role: Role.ong,
      avata: ''
  }) // Cria um novo usuario para ser testado

  // await userRepository.creat(newUser)
  // await userRepository.creat(newUser2)

    const user = await sut.execute() // Meto de caso de uso que lista o usuario
    
    expect(user).toContainEqual(expect.objectContaining({ name: 'Marcos' })); // testa se retorna um objeto com o usuario
  })
})