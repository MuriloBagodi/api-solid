import { PrismaCheckInRepositorie } from './../../repositories/prisma/prisma-checkin-repositorie'
import { ValidateCheckInUseCase } from '../validate-checkin'

export function makeValidateCheckInUseCase() {
  const checkInRepositorie = new PrismaCheckInRepositorie()
  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepositorie)

  return validateCheckInUseCase
}
