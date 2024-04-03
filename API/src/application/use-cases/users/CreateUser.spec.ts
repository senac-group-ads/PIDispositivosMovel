import { expect, describe, it, beforeEach } from 'vitest'
import { User, Role } from '../../entities/users'
import { CreateUser } from './CreateUser'
import { DrizzleUserRepository } from '@/repository/table/UsersRepository'

let userRepository: DrizzleUserRepository
let sut: CreateUser
describe('Register Use Case', () => {
  beforeEach(() => {
    userRepository = new DrizzleUserRepository()
    sut = new CreateUser(userRepository)
  })
  
  it('should be able create a pet', async () => {
    const user = new User({
        name: 'Marcos',
        email: 'marcos@marcos4.com',
        cep: '26170330',
        numero: '4365',
        contato: '21 99999-9999',
        password: '123456',
        role: Role.ong
    })

    const created = await userRepository.creat(user)

    console.log(created)

    expect(created.id).toEqual(expect.any(String))
  })
})