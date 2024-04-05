import { expect, describe, it, beforeEach } from 'vitest'

import { Role } from '../../entities/users'
import { CreateUser } from './CreateUser'
import { UserAlreadyExistsError } from '../erros/user-already-exists-error'
import { InMemoryUserRepository } from '../../../repository/in-memory/UsersRepository'

let userRepository: InMemoryUserRepository // usa um banco fake para testar a aplicação
let sut: CreateUser // metodo de use-case

describe('Criate user Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new CreateUser(userRepository)
  })
  
  it('should be able create a user', async () => { // Testa se o metodo de criar o usuario esta funcionando
    const created = await sut.execute({
      name: 'Marcos',
      email: 'marcos@marcos2.com',
      cep: '26170330',
      numero: '4365',
      contato: '21 99999-9999',
      password: '123456',
      role: Role.ong,
      avata: ''
    })

    expect(created.user.id).toEqual(expect.any(String))
  })

  it('should return existing user error', async () => { // Testa se vai dar erro caso já exista o usuario no banco

    await sut.execute({
      name: 'Marcos',
      email: 'marcos@marcos.com',
      cep: '26170330',
      numero: '4365',
      contato: '21 99999-9999',
      password: '123456',
      role: Role.ong,
      avata: ''
    })

    await expect(() =>
      sut.execute({
      name: 'Marcos',
      email: 'marcos@marcos.com',
      cep: '26170330',
      numero: '4365',
      contato: '21 99999-9999',
      password: '123456',
      role: Role.ong,
      avata: ''
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})