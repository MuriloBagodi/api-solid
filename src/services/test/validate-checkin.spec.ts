import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInRepositorie } from '@/repositories/in-memory/in-memory-checkin-rpositorie'
import { ValidateCheckInUseCaseUseCase } from '../validate-checkin'
import { ResourceNotFoundError } from '../errors_handlers/resource-not-found'

let checkInRepository: InMemoryCheckInRepositorie
let sut: ValidateCheckInUseCaseUseCase

describe('Validate Check-In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepositorie()
    // sut -> System under test
    sut = new ValidateCheckInUseCaseUseCase(checkInRepository)
  })

  it('Should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInRepository.create({
      user_id: 'any_user_id',
      gym_id: 'any_gym_id',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
    expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
  })
  it('Should not be able to validate an inexistent check-in', async () => {
    expect(() =>
      sut.execute({
        checkInId: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
