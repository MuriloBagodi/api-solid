import { PrismaCheckInRepositorie } from '@/repositories/prisma/prisma-checkin-repositorie'
import { MakeCheckInUseCase } from '../checkin'
import { PrismaGymsRepositories } from '@/repositories/prisma/prisma-gyms-repositorie'

export function makeCheckInUseCase() {
  const checkInsRepositorie = new PrismaCheckInRepositorie()
  const gymsRepositorie = new PrismaGymsRepositories()
  const checkInUseCase = new MakeCheckInUseCase(
    checkInsRepositorie,
    gymsRepositorie,
  )

  return checkInUseCase
}
