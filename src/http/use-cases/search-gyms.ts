import { IGymsRepository } from '@/repositories/interfaces/gyms-repository-interface'
import { Gym } from '@prisma/client'

interface ISearchGymsUseCaseRequest {
  query: string
  page: number
}

interface ISearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private checkInRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: ISearchGymsUseCaseRequest): Promise<ISearchGymsUseCaseResponse> {
    const gyms = await this.checkInRepository.searchMany(query, page)

    return { gyms }
  }
}
