import { PrismaUsersRepositories } from '@/repositories/prisma/prisma-users-repositorie'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthtenticateUseCase() {
  const usersRepositories = new PrismaUsersRepositories()
  const authenticateUseCase = new AuthenticateUseCase(usersRepositories)

  return authenticateUseCase
}
