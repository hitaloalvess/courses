import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearByGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearByGymsUseCase

describe('Fetch User CheckIns History Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearByGymsUseCase(gymsRepository)
  })

  it('should be able to fetch near gym', async () => {
    await gymsRepository.create({
      id: 'gym-1',
      title: 'Near Gym',
      description: '',
      phone: '',
      latitude: -20.1818112,
      longitude: -49.6992256,
    })

    await gymsRepository.create({
      id: 'gym-2',
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: -20.3028024,
      longitude: -49.7448473,
    })

    const { gyms } = await sut.execute({
      userLatitude: -20.1818112,
      userLongitude: -49.6992256,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
