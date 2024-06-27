import { PrismaGymsRepositories } from '@/repositories/prisma/prisma-gyms-repositorie'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gymsRepositories = new PrismaGymsRepositories()
  const searchGymsUseCase = new SearchGymsUseCase(gymsRepositories)

  return searchGymsUseCase
}
