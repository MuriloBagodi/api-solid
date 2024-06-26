import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkinsRepository'

interface FetchUserCheckinsUseCaseRequest {
  userId: string
  page: number
}
interface FetchUserCheckinsUseCaseResponse {
  checkIns: CheckIn[]
}
export class FetchUserCheckinsUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckinsUseCaseRequest): Promise<FetchUserCheckinsUseCaseResponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkIns }
  }
}
