import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryCheckInRepositorie } from '@/repositories/in-memory/in-memory-checkin-rpositorie'
import { FetchUserCheckinsUseCase } from '../fetch-user-checkins-numbers'

let checkInRepository: InMemoryCheckInRepositorie
let sut: FetchUserCheckinsUseCase

describe('Fetch Check-Ins Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepositorie()
    // sut -> System under test
    sut = new FetchUserCheckinsUseCase(checkInRepository)
  })

  it('Should be able to fetch checkin', async () => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
    await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-01',
      }),
      expect.objectContaining({
        gym_id: 'gym-02',
      }),
    ])
  })

  it('Should be able to fetch paginated checkin', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }
    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gym-21',
      }),
      expect.objectContaining({
        gym_id: 'gym-22',
      }),
    ])
  })
})
