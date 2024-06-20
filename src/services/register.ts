import { passwordHash } from '@/middleware/passwordHandler'
import { UsersRepository } from '@/repositories/usersRepository'
import { UserAlreadyExistsError } from './errors_handlers/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-explicit-any
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    await this.usersRepository.create({
      name,
      email,
      password: await passwordHash(password),
    })
  }
}
