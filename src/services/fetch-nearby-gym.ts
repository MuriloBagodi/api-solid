import { GymsRepository } from './../repositories/gymRepository'
import { Gym } from '@prisma/client'

interface FetchNearByGymsUseCaseRequest {
  userLat: number
  userLon: number
}
interface FetchNearByGymsUseCaseResponse {
  gyms: Gym[]
}
export class FetchNearByGymsUseCaseUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLat,
    userLon,
  }: FetchNearByGymsUseCaseRequest): Promise<FetchNearByGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearBy({
      latitude: userLat,
      longitude: userLon,
    })

    return { gyms }
  }
}
