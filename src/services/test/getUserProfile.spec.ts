import { GetUserProfileUseCase } from './../getUserProfile'
import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositorie'
import { passwordHash } from '@/middleware/passwordHandler'
import { ResourceNotFoundError } from '../errors_handlers/resource-not-found'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get user profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    // sut -> System under test
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('Should be able to get user profile by id', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await passwordHash('password123'),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('Should not be able to get usre profile with the wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-exist-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
