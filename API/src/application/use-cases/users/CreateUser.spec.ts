import { expect, describe, it, beforeEach } from 'vitest'
import { Role } from '../../entities/users'
import { CreateUser } from './CreateUser'
import { DrizzleUserRepository } from '@/repository/table/UsersRepository'
import { UserAlreadyExistsError } from '../erros/user-already-exists-error'

let userRepository: DrizzleUserRepository
let sut: CreateUser
describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new DrizzleUserRepository()
    sut = new CreateUser(userRepository)
  })
  
  it('should be able create a user', async () => {
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

  it('should return existing user error', async () => {

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