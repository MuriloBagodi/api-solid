import { PrismaGymsRepositories } from '@/repositories/prisma/prisma-gyms-repositorie'
import { FetchNearByGymsUseCase } from '../fetch-nearby-gym'

export function makeFetchNearbyGymUseCase() {
  const gymsRepositorie = new PrismaGymsRepositories()
  const fetchNearbyUseCase = new FetchNearByGymsUseCase(gymsRepositorie)

  return fetchNearbyUseCase
}
