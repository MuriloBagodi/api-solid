import { expect, it, describe, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInRepositorie } from '@/repositories/in-memory/in-memory-checkin-rpositorie'
import { MakeCheckInUseCase } from '../checkin'
import { InMemoryGymRepositorie } from '@/repositories/in-memory/in-memory-gym-repositorie'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from '../errors_handlers/max-distance-error'
import { MaxNumberOfCheckIns } from '../errors_handlers/max-number-of-check-ins-error'

let checkInRepository: InMemoryCheckInRepositorie
let gymsRepository: InMemoryGymRepositorie
let sut: MakeCheckInUseCase

describe('Check-In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepositorie()
    gymsRepository = new InMemoryGymRepositorie()
    // sut -> System under test
    sut = new MakeCheckInUseCase(checkInRepository, gymsRepository)

    await gymsRepository.create({
      id: 'any_gym_id',
      description: 'any description',
      latitude: -23.559213611963752,
      longitude: -46.59266744042996,
      phone: '',
      title: 'any_title',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('Should be able to check-in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 8))

    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLat: -23.559213611963752,
      userLon: -46.59266744042996,
    })

    expect(checkIn.user_id).toEqual(expect.any(String))
  })

  it('Should not be able to check-in if its too far from gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672),
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLat: -27.2092052,
        userLon: -49.6401091,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })

  it('Should be not able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLat: -23.559213611963752,
      userLon: -46.59266744042996,
    })

    await expect(() =>
      sut.execute({
        userId: 'any_user_id',
        gymId: 'any_gym_id',
        userLat: -23.559213611963752,
        userLon: -46.59266744042996,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckIns)
  })

  it('Should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLat: -23.559213611963752,
      userLon: -46.59266744042996,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'any_user_id',
      gymId: 'any_gym_id',
      userLat: -23.559213611963752,
      userLon: -46.59266744042996,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
