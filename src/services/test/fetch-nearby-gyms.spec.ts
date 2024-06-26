import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymRepositorie } from '@/repositories/in-memory/in-memory-gym-repositorie'
import { FetchNearByGymsUseCaseUseCase } from '../fetch-nearby-gym'

let gymsRepository: InMemoryGymRepositorie
let sut: FetchNearByGymsUseCaseUseCase

describe('Fetch NearBy Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepositorie()
    // sut -> System under test
    sut = new FetchNearByGymsUseCaseUseCase(gymsRepository)
  })

  it('Should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym 01 near',
      description: '',
      phone: '',
      latitude: -27.0747279,
      longitude: -49.4889672,
    })
    await gymsRepository.create({
      title: 'JavaScript Gym 02 far',
      description: '',
      phone: '',
      latitude: -22.679574069186508,
      longitude: -47.66593685292176,
    })

    const { gyms } = await sut.execute({
      userLat: -27.0747279,
      userLon: -49.4889672,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms[0].title).toBe('JavaScript Gym 01 near')
  })
})
