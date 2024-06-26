import { GymsRepository } from './../repositories/gymRepository'
import { Gym } from '@prisma/client'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}
interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}
export class SearchGymsUseCaseUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
