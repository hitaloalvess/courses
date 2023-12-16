import { IGymsRepository } from '@/repositories/interfaces/gyms-repository-interface'
import { Gym } from '@prisma/client'

interface IFetchNearByGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface IFetchNearByGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearByGymsUseCase {
  constructor(private checkInRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearByGymsUseCaseRequest): Promise<IFetchNearByGymsUseCaseResponse> {
    const gyms = await this.checkInRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}
