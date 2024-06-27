import { PrismaGymsRepositories } from '@/repositories/prisma/prisma-gyms-repositorie'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymsRepositorie = new PrismaGymsRepositories()
  const createGymUseCase = new CreateGymUseCase(gymsRepositorie)

  return createGymUseCase
}
