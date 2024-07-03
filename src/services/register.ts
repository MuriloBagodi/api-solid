import { passwordHash } from '@/utils/passwordHandler'
import { UsersRepository } from '@/repositories/usersRepository'
import { UserAlreadyExistsError } from './errors_handlers/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  role: 'MEMBER' | 'ADMIN'
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-explicit-any
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    const user = await this.usersRepository.create({
      name,
      email,
      password: await passwordHash(password),
      role,
    })

    return { user }
  }
}
