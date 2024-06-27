import { expect, it, describe, beforeEach } from 'vitest'
import { SearchGymsUseCase } from '../search-gyms'
import { InMemoryGymRepositorie } from '@/repositories/in-memory/in-memory-gym-repositorie'

let gymsRepositorie: InMemoryGymRepositorie
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepositorie = new InMemoryGymRepositorie()
    // sut -> System under test
    sut = new SearchGymsUseCase(gymsRepositorie)
  })

  it('Should be able to search for gyms ', async () => {
    await gymsRepositorie.create({
      title: 'gym_01',
      description: 'academia legal',
      phone: '111111111',
      latitude: -23.557375982777984,
      longitude: -46.62708670243924,
    })
    await gymsRepositorie.create({
      title: 'gym_02',
      description: 'academia legal',
      phone: '111111111',
      latitude: -23.557375982777984,
      longitude: -46.62708670243924,
    })
    const { gyms } = await sut.execute({
      query: '01',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'gym_01',
      }),
    ])
  })

  it('Should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepositorie.create({
        title: `gym_${i}`,
        description: 'academia legal',
        phone: '111111111',
        latitude: -23.557375982777984,
        longitude: -46.62708670243924,
      })
    }
    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'gym_21',
      }),
      expect.objectContaining({
        title: 'gym_22',
      }),
    ])
  })
})
