import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInRepositorie } from '@/repositories/in-memory/in-memory-checkin-rpositorie'
import { CancelCheckInUseCaseUseCase } from '../cancel-user-checkin'

let checkInRepository: InMemoryCheckInRepositorie
let sut: CancelCheckInUseCaseUseCase

describe('Cancel Check-In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepositorie()
    // sut -> System under test
    sut = new CancelCheckInUseCaseUseCase(checkInRepository)
  })

  it('Should be able to cancel a check-in', async () => {
    await checkInRepository.create({
      id: 'any_gym_id',
      user_id: 'any_user_id',
      gym_id: 'any_gym_id',
    })
    const { checkIn } = await sut.execute({
      checkInId: 'any_gym_id',
      userId: 'any_user_id',
    })

    expect(checkIn).toEqual(undefined)
  })
})
