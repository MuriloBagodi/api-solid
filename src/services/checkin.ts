import { GymsRepository } from './../repositories/gymRepository'
import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkinsRepository'
import { ResourceNotFoundError } from './errors_handlers/resource-not-found'
import { getDistanceBetweenCoordinates } from '@/utils/get-distancie-by-coordinates'
import { MaxDistanceError } from './errors_handlers/max-distance-error'
import { MaxNumberOfCheckIns } from './errors_handlers/max-number-of-check-ins-error'

interface MakeCheckInUseCaseRequest {
  userId: string
  gymId: string
  userLat: number
  userLon: number
}
interface MakeCheckInUseCaseResponse {
  checkIn: CheckIn
}
export class MakeCheckInUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private checkinsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLat,
    userLon,
  }: MakeCheckInUseCaseRequest): Promise<MakeCheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findByID(gymId)
    if (!gym) {
      throw new ResourceNotFoundError()
    }
    // calcular distancia entre o usuario e academia
    const distance = getDistanceBetweenCoordinates(
      {
        lat: userLat,
        lon: userLon,
      },
      {
        lat: gym.latitude.toNumber(),
        lon: gym.longitude.toNumber(),
      },
    )

    const maxDistanceInKilometers = 0.1

    if (distance > maxDistanceInKilometers) {
      throw new MaxDistanceError()
    }
    const checkInOnSameDate = await this.checkinsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckIns()
    }

    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
