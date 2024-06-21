import { RegisterUseCase } from '@/services/register'
import { expect, it, describe, beforeEach } from 'vitest'
import { compare } from 'bcrypt'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositorie'
import { UserAlreadyExistsError } from '../errors_handlers/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('Should not be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should be hashed the user password', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password123',
      user.password,
    )

    expect(isPasswordCorrectlyHashed).toEqual(true)
  })

  it('Should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: 'password123',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
