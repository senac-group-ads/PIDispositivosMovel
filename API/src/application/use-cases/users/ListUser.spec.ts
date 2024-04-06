import { InMemoryUserRepository } from "@/repository/in-memory/UsersRepository"
import { ListUser } from "./ListUser"
import { beforeEach, describe, expect, it, suite } from "vitest"
import { Role, User } from "@/application/entities/users"


let userRepository: InMemoryUserRepository // usa um banco fake para testar a aplicação
let sut: ListUser // metodo de use-case

describe('Criate user Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new ListUser(userRepository)
  })
  
  it('should be able create a user', async () => { // Testa a listagem de usuario apartir do caso de uso.

    // TODO: Testar se o retorno vai funcionar com mais de um usuario.
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
    await userRepository.creat(newUser)

    const user = await sut.execute() // Meto de caso de uso que lista o usuario
    
    expect(user.user.id).toEqual(expect.any(String)) // testa se retorna um id
    expect(user.user).toEqual(expect.objectContaining({ name: 'Marcos'})) // testa se retorna um objeto com o usuario
  })

//   it('should return existing user error', async () => { // Testa se vai dar erro caso já exista o usuario no banco

//     await expect(() =>
//       sut.execute({
//       name: 'Marcos',
//       email: 'marcos@marcos.com',
//       cep: '26170330',
//       numero: '4365',
//       contato: '21 99999-9999',
//       password: '123456',
//       role: Role.ong,
//       avata: ''
//       })
//     ).rejects.toBeInstanceOf(UserAlreadyExistsError)
//   })
})