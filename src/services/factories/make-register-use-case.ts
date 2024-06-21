import { PrismaUsersRepositories } from '@/repositories/prisma/prisma-users-repositorie'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepositories = new PrismaUsersRepositories()
  const registerUseCase = new RegisterUseCase(usersRepositories)

  return registerUseCase
}
