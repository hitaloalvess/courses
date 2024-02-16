import { ICheckInsRepository } from '@/repositories/interfaces/check-ins-interface'
import { CheckIn } from '@prisma/client'

interface IFetchUserCheckInsHistoryUseCaseRequest {
  userId: string
  page: number
}

interface IFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryUseCaseRequest): Promise<IFetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

    return { checkIns }
  }
}
