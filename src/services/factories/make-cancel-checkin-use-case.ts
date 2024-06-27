import { CancelCheckInUseCase } from '../cancel-user-checkin'
import { PrismaCheckInRepositorie } from '@/repositories/prisma/prisma-checkin-repositorie'

export function makeCancelCheckInUseCase() {
  const checkInsRepositorie = new PrismaCheckInRepositorie()
  const cancelCheckInUseCase = new CancelCheckInUseCase(checkInsRepositorie)

  return cancelCheckInUseCase
}
