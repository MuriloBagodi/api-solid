import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkinsRepository'

interface CancelCheckInUseCaseRequest {
  userId: string
  checkInId: string
}
interface CancelCheckInUseCaseResponse {
  checkIn: CheckIn | null | undefined
}
export class CancelCheckInUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    checkInId,
  }: CancelCheckInUseCaseRequest): Promise<CancelCheckInUseCaseResponse> {
    const checkIn = await this.checkinsRepository.cancelCheckIn(
      userId,
      checkInId,
    )

    return {
      checkIn,
    }
  }
}
