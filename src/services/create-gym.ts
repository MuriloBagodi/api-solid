import { GymsRepository } from './../repositories/gymRepository'
import { Gym } from '@prisma/client'

interface CreateGymRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}
interface CreateGymResponse {
  gym: Gym
}
export class CreateGymUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymRequest): Promise<CreateGymResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
