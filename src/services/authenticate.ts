import { UsersRepository } from '@/repositories/usersRepository'
import { InvalidCredentialError } from './errors_handlers/invalid-credential-error'
import { comparePassword } from '@/utils/passwordHandler'
import { User } from '@prisma/client'

interface AuthenticateRequest {
  email: string
  password: string
}
interface AuthenticateResponse {
  user: User
}
export class AuthenticateUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    // auth
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await comparePassword(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }

    return {
      user,
    }
  }
}
