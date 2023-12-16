import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Fetch User CheckIns History Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to fetch user check in history', async () => {
    await gymsRepository.create({
      id: 'gym-1',
      title: 'MACAR',
      description: '',
      phone: '',
      latitude: -20.1818112,
      longitude: -49.6992256,
    })

    await gymsRepository.create({
      id: 'gym-2',
      title: 'MILFE',
      description: '',
      phone: '',
      latitude: -20.1818112,
      longitude: -49.6992256,
    })

    const { gyms } = await sut.execute({
      query: 'MACAR',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'MACAR' })])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: 'gym-2',
        title: `MACAR - ${i}`,
        description: '',
        phone: '',
        latitude: -20.1818112,
        longitude: -49.6992256,
      })
    }

    const { gyms } = await sut.execute({
      query: 'MACAR',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'MACAR - 21' }),
      expect.objectContaining({ title: 'MACAR - 22' }),
    ])
  })
})
