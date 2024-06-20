import { RegisterUseCase } from '@/services/register'
import { expect, it, describe } from 'vitest'
import { compare } from 'bcrypt'

describe('Register Use Case', () => {
  it('Should be hashed the user password', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail() {
        return null
      },

      async create(data) {
        return {
          id: 'any_id',
          name: data.name,
          email: data.email,
          password: data.password,
          created_at: new Date(),
        }
      },
    })

    const { user } = await registerUseCase.execute({
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
})
