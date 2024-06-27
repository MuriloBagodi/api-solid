import { PrismaCheckInRepositorie } from '@/repositories/prisma/prisma-checkin-repositorie'
import { FetchUserCheckinsUseCase } from '../fetch-user-checkins-numbers'

export function makeFetchUserCheckInsUseCase() {
  const checkInRepositorie = new PrismaCheckInRepositorie()
  const fetchUserCheckInsUseCase = new FetchUserCheckinsUseCase(
    checkInRepositorie,
  )

  return fetchUserCheckInsUseCase
}
