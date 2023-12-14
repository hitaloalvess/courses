import { ICheckInsRepository } from '@/repositories/interfaces/check-ins-interface'
import { CheckIn } from '@prisma/client'

interface ICheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface ICheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInRepository: ICheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
