import { expect, it, describe, beforeEach } from 'vitest'
import { InMemoryGymRepositorie } from '@/repositories/in-memory/in-memory-gym-repositorie'
import { CreateGymUseCase } from '../create-gym'

let gymsRepository: InMemoryGymRepositorie
let sut: CreateGymUseCase

describe('Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepositorie()
    // sut -> System under test
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('Should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym 1',
      description: 'academia legal',
      phone: '111111111',
      latitude: -23.557375982777984,
      longitude: -46.62708670243924,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
