import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)

    gymsRepository.checkIns.push({
      id: 'gym-1',
      title: 'MACAR fitness',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers() // Mock a data para que ela seja criada em um espaço tempo fake
  })

  afterEach(() => {
    vi.useRealTimers() // Volta a data a ciclo normal
  })

  it('should be able to create check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -20.1818112,
      userLongitude: -49.6992256,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to create check in with twice identical days', async () => {
    vi.setSystemTime(new Date(2023, 11, 13, 1, 0)) // Cria uma data em um espaço tempo ficticio

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -20.1818112,
      userLongitude: -49.6992256,
    })

    await expect(() =>
      sut.execute({
        gymId: 'gym-1',
        userId: 'user-1',
        userLatitude: -20.1818112,
        userLongitude: -49.6992256,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to create in twice but in different days', async () => {
    vi.setSystemTime(new Date(2023, 11, 12, 0, 0))

    await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -20.1818112,
      userLongitude: -49.6992256,
    })

    vi.setSystemTime(new Date(2023, 11, 13, 0, 0))

    const { checkIn } = await sut.execute({
      gymId: 'gym-1',
      userId: 'user-1',
      userLatitude: -20.1818112,
      userLongitude: -49.6992256,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
