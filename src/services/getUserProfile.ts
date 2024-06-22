import { UsersRepository } from '@/repositories/usersRepository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors_handlers/resource-not-found'

interface GetUserProfileRequest {
  userId: string
}
interface GetUserProfileResponse {
  user: User
}
export class GetUserProfileUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
