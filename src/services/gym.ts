import { Gym } from '@prisma/client'
import { ResourceNotFoundError } from './errors_handlers/resource-not-found'
import { GymsRepository } from '@/repositories/gymRepository'

interface GymRequest {
  gymId: string
}
interface GymResponse {
  gym: Gym
}
export class GymUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: GymsRepository) {}

  async execute({ gymId }: GymRequest): Promise<GymResponse | null> {
    const gym = await this.usersRepository.findByID(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    return {
      gym,
    }
  }
}
