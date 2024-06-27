import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepositorie } from '@/repositories/in-memory/in-memory-checkin-rpositorie'
import { ValidateCheckInUseCase } from '../validate-checkin'
import { ResourceNotFoundError } from '../errors_handlers/resource-not-found'
import { TimeHasExceedLimit } from '../errors_handlers/time-has-exceed-limit'

let checkInRepository: InMemoryCheckInRepositorie
let sut: ValidateCheckInUseCase

describe('Validate Check-In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepositorie()
    // sut -> System under test
    sut = new ValidateCheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
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

  it('Should not be able to validate the check-in after 20 minutes', async () => {
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))
    const createdCheckIn = await checkInRepository.create({
      user_id: 'any_user_id',
      gym_id: 'any_gym_id',
    })
    const twentyOneMinutesInMs = 1000 * 60 * 21 // 21 min
    vi.advanceTimersByTime(twentyOneMinutesInMs)

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(TimeHasExceedLimit)
  })
})
