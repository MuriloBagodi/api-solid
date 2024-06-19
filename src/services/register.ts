import { passwordHash } from '@/middleware/passwordHandler'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-explicit-any
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    await this.usersRepository.searchEmail(email)
    await this.usersRepository.create({
      name,
      email,
      password: await passwordHash(password),
    })
  }
}
