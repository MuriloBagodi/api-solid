import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkinsRepository'
import { ResourceNotFoundError } from './errors_handlers/resource-not-found'
import dayjs from 'dayjs'
import { TimeHasExceedLimit } from './errors_handlers/time-has-exceed-limit'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}
interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}
export class ValidateCheckInUseCaseUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkinsRepository.findById(checkInId)
    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckinCreation > 20) {
      throw new TimeHasExceedLimit()
    }

    checkIn.validated_at = new Date()

    await this.checkinsRepository.save(checkIn)

    return {
      checkIn,
    }
  }
}
