import { expect, describe, it, beforeEach } from 'vitest'

import { InMemoryUserRepository } from '@/repository/in-memory/UsersRepository'
import { AutheticateUser } from './authenticateUser'
import { Role, User } from '@/application/entities/users'
import { hash } from 'bcrypt'
import { UnexistUser } from '../erros/unexistUser'
import { IncorrectUserPassword } from '../erros/incorrectPassword'

let userRepository: InMemoryUserRepository // usa um banco fake para testar a aplicação
let sut: AutheticateUser // metodo de use-case

describe('Autheticated user Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AutheticateUser(userRepository)
  })
  
  it('should be able authenticated with a user', async () => { 
    const email = 'marcos@marcos.com'
    const password = '123456'
    const passwordHash = await hash(password, 6)
    
    const newUser2 = new User({
        name: 'Marcos',
        email,
        cep: '26170330',
        numero: '4365',
        contato: '21 99999-9999',
        password: passwordHash,
        role: Role.ong,
        avata: ''
    }) // Cria um novo usuario para ser testado
  
    await userRepository.creat(newUser2)

    const user = await sut.execute({
        email,
        password
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should return an error if there are no users', async () => {
    const email = 'marcos@marcos.com'
    const password = '123456' 
    expect(() => sut.execute({ email, password })).rejects.toBeInstanceOf(UnexistUser)
  })

  it('should return an error if the password is incorrect', async () => {
    const email = 'marcos@marcos.com'
    const pas = '123456'
    const passwordHash = await hash(pas, 6)
    
    const newUser2 = new User({
        name: 'Marcos',
        email,
        cep: '26170330',
        numero: '4365',
        contato: '21 99999-9999',
        password: passwordHash,
        role: Role.ong,
        avata: ''
    }) // Cria um novo usuario para ser testado
  
    await userRepository.creat(newUser2)
    expect(() => sut.execute({
      email,
      password: '111111' 
    })).rejects.toBeInstanceOf(IncorrectUserPassword)
  })

})