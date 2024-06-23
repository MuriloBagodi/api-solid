import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkinsRepository'

interface MakeCheckInUseCaseRequest {
  userId: string
  gymId: string
}
interface MakeCheckInUseCaseResponse {
  checkIn: CheckIn
}
export class MakeCheckInUseCaseUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: MakeCheckInUseCaseRequest): Promise<MakeCheckInUseCaseResponse> {
    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
