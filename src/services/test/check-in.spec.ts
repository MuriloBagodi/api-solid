import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInRepositorie } from '@/repositories/in-memory/in-memory-checkin-rpositorie'
import { MakeCheckInUseCaseUseCase } from '../checkin'

let checkInRepository: InMemoryCheckInRepositorie
let sut: MakeCheckInUseCaseUseCase

describe('Check-In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepositorie()
    // sut -> System under test
    sut = new MakeCheckInUseCaseUseCase(checkInRepository)
  })
  it('Should be able to check-in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
    })

    expect(checkIn.user_id).toEqual(expect.any(String))
  })
})
