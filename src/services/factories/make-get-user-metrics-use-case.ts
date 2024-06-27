import { PrismaCheckInRepositorie } from '@/repositories/prisma/prisma-checkin-repositorie'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkInRepositorie = new PrismaCheckInRepositorie()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepositorie)

  return getUserMetricsUseCase
}
