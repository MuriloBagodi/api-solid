import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositorie'
import { AuthenticateUseCase } from '../authenticate'
import { passwordHash } from '@/utils/passwordHandler'
import { InvalidCredentialError } from '../errors_handlers/invalid-credential-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    // sut -> System under test
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await passwordHash('password123'),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with the wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('Should not be able to authenticate with the wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await passwordHash('password123'),
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
