import { Decimal } from '@prisma/client/runtime/library'
import { Gym, Prisma } from '@prisma/client'
import { FindManyNearByParams, GymsRepository } from '../gymRepository'
import { randomUUID } from 'crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distancie-by-coordinates'

export class InMemoryGymRepositorie implements GymsRepository {
  public items: Gym[] = []

  async findManyNearBy(params: FindManyNearByParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          lat: params.latitude,
          lon: params.longitude,
        },
        { lat: item.latitude.toNumber(), lon: item.longitude.toNumber() },
      )
      return distance <= 10
    })
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findByID(gymId: string) {
    const gym = this.items.find((item) => item.id === gymId)

    if (!gym) {
      return null
    }

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      created_at: new Date(),
    }
    this.items.push(gym)

    return gym
  }
}
