import { expect, it, describe } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositorie'
import { AuthenticateUseCase } from '../authenticate'
import { passwordHash } from '@/middleware/passwordHandler'
import { InvalidCredentialError } from '../errors_handlers/invalid-credential-error'

describe('Authenticate Use Case', () => {
  it('Should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    // sut -> System under test
    const sut = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new InMemoryUsersRepository()
    // sut -> System under test
    const sut = new AuthenticateUseCase(usersRepository)

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('Should not be able to authenticate with the wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    // sut -> System under test
    const sut = new AuthenticateUseCase(usersRepository)

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await passwordHash('password123'),
    })

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
