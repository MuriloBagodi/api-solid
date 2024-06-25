import { Gym } from '@prisma/client'
import { GymsRepository } from '../gymRepository'

export class InMemoryGymRepositorie implements GymsRepository {
  public items: Gym[] = []

  async findByID(gymId: string) {
    const gym = this.items.find((item) => item.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }
}
