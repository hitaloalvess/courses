import { ICheckInsRepository } from '@/repositories/interfaces/check-ins-interface'

interface IGetByUserMetricsRequest {
  userId: string
}

interface IGetByUserMetricsResponse {
  checkInsCount: number
}

export class GetByUserMetricsUseCase {
  constructor(private checkInRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: IGetByUserMetricsRequest): Promise<IGetByUserMetricsResponse> {
    const checkInsCount = await this.checkInRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
