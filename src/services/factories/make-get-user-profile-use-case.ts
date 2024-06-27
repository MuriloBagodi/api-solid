import { GetUserProfileUseCase } from './../getUserProfile'
import { PrismaUsersRepositories } from '@/repositories/prisma/prisma-users-repositorie'

export function makeGetUserProfileUseCase() {
  const userRepositorie = new PrismaUsersRepositories()
  const getUserProfileUseCase = new GetUserProfileUseCase(userRepositorie)

  return getUserProfileUseCase
}
